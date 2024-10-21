import React from 'react';
import BodyComponent from '@/components/BodyComponents';
import Products from '@/components/Products/Products';


export default function HomePage() {
  return (
    <div className="w-full p-0 mt-[70px]">
      <BodyComponent />
      <Products />
    </div>
  );
}