"use client";

import React, { useState } from "react";
import ProductList from "./ProductList";
import { productsData } from "@/data/products";

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("iPhone");

  return (
    <div className="w-full p-0 bg-[#F1F2EE]">
      <div className="container mx-auto px-4 lg:px-0">
        <h1 className="text-3xl font-base pt-20 pb-10 md:pt-[120px] md:pb-[70px] uppercase">
          Productos por Categoría
        </h1>
        <div className="flex gap-10 mb-0 md:justify-center overflow-auto">
          {Object.keys(productsData.products).map((category) => (
            <p
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-0 py-2 uppercase text-[19px] font-light cursor-pointer ${
                selectedCategory === category
                  ? "border-foreground border-b"
                  : "border-none"
              }`}
            >
              {category}
            </p>
          ))}
        </div>
      </div>
      <ProductList 
        products={productsData.products[selectedCategory]} 
        category={selectedCategory}
      />
    </div>
  );
};

export default Products;