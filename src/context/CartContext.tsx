'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartContextType, CartItem, CartNotification } from "@/types/cart";
import CartNotificationComponent from "@/components/Header/CartNotification";

const CART_STORAGE_KEY = "shopping-cart";
const CART_BACKUP_KEY = "shopping-cart-backup";
const CART_EXPIRY_HOURS = 72;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [notification, setNotification] = useState<CartNotification | null>(null);

  const showNotification = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setNotification({ message, type });
  };

  // Efecto para calcular cartCount y cartTotal cuando cambia el carrito
  useEffect(() => {
    if (cart) {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);

      const total = cart.reduce((sum, item) => {
        const price = typeof item.product.price === 'number'
          ? item.product.price
          : (item.selectedStorage ? item.product.price[item.selectedStorage] : Object.values(item.product.price)[0]);
        return sum + (price * item.quantity);
      }, 0);
      setCartTotal(total);
    }
  }, [cart]);

  // Sincronizar carrito entre pestañas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const { items } = JSON.parse(e.newValue);
          setCart(items);
          showNotification("Carrito sincronizado", "info");
        } catch (error) {
          console.error("Error syncing cart:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Cargar carrito inicial
  useEffect(() => {
    loadCart();
    setIsInitialized(true);
  }, []);

  // Guardar carrito cuando cambie
  useEffect(() => {
    if (isInitialized) {
      saveCart(cart);
    }
  }, [cart, isInitialized]);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const { items, timestamp } = JSON.parse(savedCart);
        const now = new Date().getTime();
        const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);

        if (hoursElapsed <= CART_EXPIRY_HOURS) {
          setCart(items);
        } else {
          // Hacer backup antes de limpiar
          localStorage.setItem(CART_BACKUP_KEY, savedCart);
          localStorage.removeItem(CART_STORAGE_KEY);
          setCart([]);
          showNotification("Tu carrito ha expirado", "info");
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      showNotification("Error al cargar el carrito", "error");
    }
  };

  const saveCart = (items: CartItem[]) => {
    try {
      const cartData = {
        items,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
      if (items.length > 0) {
        localStorage.setItem(CART_BACKUP_KEY, JSON.stringify(cartData));
      }
    } catch (error) {
      console.error('Error saving cart:', error);
      showNotification("Error al guardar el carrito", "error");
    }
  };

  const addToCart = (newItem: CartItem) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (item) =>
          item.product.model === newItem.product.model &&
          item.selectedStorage === newItem.selectedStorage &&
          item.selectedColor === newItem.selectedColor
      );

      let updatedCart;
      if (existingItemIndex >= 0) {
        updatedCart = [...currentCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        showNotification("Cantidad actualizada en el carrito");
      } else {
        updatedCart = [...currentCart, newItem];
        showNotification("Producto añadido al carrito");
      }

      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) => {
      const updatedCart = currentCart.filter(
        (item) => item.product.model !== productId
      );
      showNotification("Producto eliminado del carrito");
      return updatedCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((currentCart) => {
      const updatedCart = currentCart
        .map((item) =>
          item.product.model === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0);

      showNotification("Cantidad actualizada");
      return updatedCart;
    });
  };

  const clearCart = () => {
    // Guardar backup antes de limpiar
    const currentCart = localStorage.getItem(CART_STORAGE_KEY);
    if (currentCart) {
      localStorage.setItem(CART_BACKUP_KEY, currentCart);
    }

    // Limpiar carrito
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    showNotification("Carrito vaciado", "info");
  };

  const syncCart = () => {
    loadCart();
  };

  const restoreLastCart = () => {
    try {
      const backupCart = localStorage.getItem(CART_BACKUP_KEY);
      if (backupCart) {
        const { items } = JSON.parse(backupCart);
        setCart(items);
        saveCart(items);
        showNotification("Último carrito restaurado", "success");
      } else {
        showNotification("No hay carrito para restaurar", "info");
      }
    } catch (error) {
      console.error("Error restoring cart:", error);
      showNotification("Error al restaurar el carrito", "error");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        syncCart,
        restoreLastCart,
      }}
    >
      {children}
      {notification && (
        <CartNotificationComponent
          message={notification.message}
          type={notification.type}
          isVisible={!!notification}
          onClose={() => setNotification(null)}
        />
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}