'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import LinearIcon from '@/components/LinearIcon';

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  zipCode: string;
}

const CheckoutPage = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, syncCart } = useCart();
  const [formData, setFormData] = useState<ShippingForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zipCode: '',
  });

  useEffect(() => {
    syncCart(); // Sincronizar al cargar la página de checkout
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago
    console.log('Datos de envío:', formData);
    console.log('Carrito:', cart);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-0 py-10 min-h-[calc(100vh-448px)]">
        <div className="text-center">
          <h1 className="text-2xl uppercase tracking-widest font-light mb-6">Tu carrito está vacío</h1>
          <Link href="/productos" className="g-button left">
            <span className="font-light tracking-widest">Continuar comprando</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-0 py-10 min-h-[calc(100vh-448px)]">
      <h1 className="text-3xl font-base pb-5 md:pb-10 uppercase">Checkout</h1>
      
      <div className="flex flex-col-reverse lg:flex-row gap-10">
        {/* Formulario de envío */}
        <div className='w-full'>
          <h2 className="text-lg uppercase tracking-widest font-light mb-6">Información de envío</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-light">Nombre</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d1d1cd] focus:outline-none focus:border-[#1a1311] bg-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-light">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d1d1cd] focus:outline-none focus:border-[#1a1311] bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 font-light">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#d1d1cd] focus:outline-none focus:border-[#1a1311] bg-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 font-light">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#d1d1cd] focus:outline-none focus:border-[#1a1311] bg-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 font-light">Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#d1d1cd] focus:outline-none focus:border-[#1a1311] bg-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-light">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d1d1cd] focus:outline-none focus:border-[#1a1311] bg-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-light">Región</label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-[#d1d1cd] focus:outline-none focus:border-[#1a1311] bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 font-light">Código Postal</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#d1d1cd] focus:outline-none focus:border-[#1a1311] bg-transparent"
                required
              />
            </div>

            <button type="submit" className="w-full g-button left mt-6">
              <span className="font-light tracking-widest">Confirmar pedido</span>
            </button>
          </form>
        </div>

        {/* Resumen del carrito */}
        <div className="bg-[#f1f2ee] lg:p-6 w-full">
          <h2 className="text-lg uppercase tracking-widest font-light mb-6">Resumen del pedido</h2>
          <div className="space-y-4 mb-3">
            {cart.map((item, index) => (
              <div key={`${item.product.model}-${index}`} className="flex gap-4 pb-4 border-b border-[#d1d1cd]">
                <Image
                  src={`/images/${item.product.model.toLowerCase().replace(/ /g, "-")}.jpg`}
                  alt={item.product.model}
                  width={80}
                  height={80}
                  className="object-cover bg-[#e2e3de]"
                />
                <div className="flex-1">
                  <div className='min-h-[48px]'>
                    <h3 className="text-xs uppercase tracking-widest">{item.product.model}</h3>
                    <div className="text-xs text-gray-600 mt-1">
                      {item.selectedStorage && <p>Almacenamiento: {item.selectedStorage}</p>}
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border h-[26px]">
                      <button className="text-[#1a1311a6] hover:text-[#1a1311] h-[26px] w-[26px]" onClick={() => updateQuantity(item.product.model, item.quantity - 1)}>
                        -
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button className="text-[#1a1311a6] hover:text-[#1a1311] h-[26px] w-[26px]" onClick={() => updateQuantity(item.product.model, item.quantity + 1)}>
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
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm uppercase tracking-widest">Subtotal</span>
              <span className="text-sm">S/.{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-sm uppercase tracking-widest">Envío</span>
              <span className="text-sm">Gratis</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-sm uppercase tracking-widest">Total</span>
              <span className="text-sm">S/.{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;