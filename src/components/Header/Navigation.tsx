'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LinearIcon from "../LinearIcon";
import CartMenu from "./CartMenu";
import { useCart } from "@/context/CartContext";

interface NavigationProps {
  onSearchClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSearchClick }) => {
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
  const { cartCount, syncCart } = useCart();

  // Sincronizar el carrito al montar el componente
  useEffect(() => {
    syncCart();
  }, []);

  // Cerrar el menú del carrito cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isCartMenuOpen && !target.closest('.cart-menu-container')) {
        setIsCartMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isCartMenuOpen]);

  return (
    <nav className="w-full flex justify-between items-center">
      <ul className="md:flex font-light text-base uppercase items-center gap-10 hidden">
        <li className="header__primary-nav-item">
          <Link href="/" className="text-xs tracking-widest">
            Inicio
          </Link>
        </li>
        <li className="header__primary-nav-item">
          <Link href="/productos" className="text-xs tracking-widest">
            Productos
          </Link>
        </li>
        <li className="header__primary-nav-item">
          <Link href="/sobre-nosotros" className="text-xs tracking-widest">
            Sobre Nosotros
          </Link>
        </li>
        <li className="header__primary-nav-item">
          <Link href="/contacto" className="text-xs tracking-widest">
            Contacto
          </Link>
        </li>
      </ul>
      <ul className="flex font-light text-base uppercase items-center gap-5">
        <li>
          <button onClick={onSearchClick}>
            <LinearIcon name="magnifier" size={20} color="" />
          </button>
        </li>
        <li>
          <Link href="/user">
            <LinearIcon name="user" size={20} color="" />
          </Link>
        </li>
        <li className="relative cart-menu-container">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsCartMenuOpen(!isCartMenuOpen);
            }}
            className="relative"
          >
            <LinearIcon name="cart" size={20} color="" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#1a1311] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <CartMenu 
            isOpen={isCartMenuOpen} 
            onClose={() => setIsCartMenuOpen(false)} 
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;