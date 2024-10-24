import { ProductData } from "@/data/products";

export interface CartItem {
  product: ProductData;
  quantity: number;
  selectedStorage?: string;
  selectedColor?: string;
  selectedSize?: string;
  selectedConnectivity?: string;
}

export interface CartNotification {
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  syncCart: () => void;
  restoreLastCart: () => void;
}