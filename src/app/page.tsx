import React from 'react';
import BodyComponent from '@/components/BodyComponents';
import Products from '@/components/Products/Products';
import InfoProduct from '@/components/Products/InfoProduct';


export default function HomePage() {
  return (
    <div className="w-full p-0">
      <BodyComponent />
      <Products />
      <InfoProduct />
    </div>
  );
}