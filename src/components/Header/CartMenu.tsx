'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import LinearIcon from '../LinearIcon';

interface CartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartMenu: React.FC<CartMenuProps> = ({ isOpen, onClose }) => {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed lg:absolute top-[68px] lg:top-full right-0 w-screen lg:w-96 bg-[#f1f2ee] border border-[#d1d1cd] shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs uppercase tracking-widest font-semibold">Carrito</h3>
          <button onClick={onClose}>
            <LinearIcon name="cross" size={16} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-sm py-4">Tu carrito está vacío</p>
        ) : (
          <>
            <div className="max-h-[400px] overflow-y-auto">
              {cart.map((item, index) => (
                <div key={`${item.product.model}-${index}`} className="flex gap-4 py-4 border-b border-[#d1d1cd]">
                  <Image
                    src={`/images/${item.product.model.toLowerCase().replace(/ /g, "-")}.jpg`}
                    alt={item.product.model}
                    width={80}
                    height={80}
                    className="object-cover bg-[#e2e3de]"
                  />
                  <div className="flex-1">
                    <div className='min-h-[48px]'>
                      <h4 className="text-xs uppercase tracking-widest">{item.product.model}</h4>
                      {item.selectedStorage && (
                        <p className="text-xs text-[#1a1311a6]">{item.selectedStorage}</p>
                      )}
                      {item.selectedColor && (
                        <p className="text-xs text-[#1a1311a6]">{item.selectedColor}</p>
                      )}
                      </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border h-[26px]">
                        <button 
                          onClick={() => updateQuantity(item.product.model, item.quantity - 1)}
                          className="text-[#1a1311a6] hover:text-[#1a1311] h-[26px] w-[26px]"
                        >
                          -
                        </button>
                        <span className="text-xs w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.model, item.quantity + 1)}
                          className="text-[#1a1311a6] hover:text-[#1a1311] h-[26px] w-[26px]"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.model)}
                        className="text-[#1a1311a6] hover:text-[#1a1311]"
                      >
                        <LinearIcon name="trash" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4">
              <div className="flex justify-between mb-4">
                <span className="text-xs uppercase tracking-widest font-semibold">Total</span>
                <span className="text-xs font-semibold">S/.{cartTotal.toFixed(2)}</span>
              </div>
              <Link 
                href="/checkout" 
                className="g-button left w-full text-center"
                onClick={onClose}
              >
                <span className="text-xs font-light tracking-widest uppercase">
                  Ir al checkout
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartMenu;