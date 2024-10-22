"use client";

import React, { useState } from "react";
import ProductList from "./ProductList";

// Definimos un tipo para la estructura de nuestros datos
type ProductData = {
  model: string;
  storageOptions?: string[];
  colors?: string[];
  price: number | { [key: string]: number };
  processor?: string;
  caseSizes?: string[];
  connectivity?: string | string[];
  caseSize?: string;
};

type ProductsData = {
  products: {
    [key: string]: ProductData[];
  };
};

const productsData: ProductsData = {
  products: {
    iPhone: [
      {
        model: "iPhone 16",
        storageOptions: ["128GB", "256GB", "512GB", "1TB"],
        colors: ["Silver", "Black", "Gold", "Blue"],
        price: {
          "128GB": 999,
          "256GB": 1099,
          "512GB": 1299,
          "1TB": 1499,
        },
      },
      {
        model: "iPhone 16 Pro",
        storageOptions: ["256GB", "512GB", "1TB", "2TB"],
        colors: ["Graphite", "Silver", "Gold", "Deep Blue"],
        price: {
          "256GB": 1199,
          "512GB": 1399,
          "1TB": 1599,
          "2TB": 1799,
        },
      },
      {
        model: "iPhone 16 Pro Max",
        storageOptions: ["256GB", "512GB", "1TB", "2TB"],
        colors: ["Graphite", "Silver", "Gold", "Deep Blue"],
        price: {
          "256GB": 1299,
          "512GB": 1499,
          "1TB": 1699,
          "2TB": 1899,
        },
      },
    ],
    iPad: [
      {
        model: "iPad Pro 12.9-inch",
        storageOptions: ["128GB", "256GB", "512GB", "1TB", "2TB"],
        colors: ["Silver", "Space Gray"],
        price: {
          "128GB": 1099,
          "256GB": 1199,
          "512GB": 1399,
          "1TB": 1599,
          "2TB": 1799,
        },
      },
      {
        model: "iPad Air",
        storageOptions: ["64GB", "256GB"],
        colors: ["Silver", "Space Gray", "Rose Gold", "Green", "Sky Blue"],
        price: {
          "64GB": 599,
          "256GB": 749,
        },
      },
    ],
    Mac: [
      {
        model: "MacBook Pro 14-inch",
        processor: "M3 Pro",
        storageOptions: ["512GB", "1TB", "2TB"],
        price: {
          "512GB": 1999,
          "1TB": 2199,
          "2TB": 2599,
        },
      },
      {
        model: "MacBook Air 13-inch",
        processor: "M3",
        storageOptions: ["256GB", "512GB", "1TB"],
        price: {
          "256GB": 999,
          "512GB": 1199,
          "1TB": 1399,
        },
      },
    ],
    AppleWatch: [
      {
        model: "Apple Watch Series 9",
        caseSizes: ["41mm", "45mm"],
        connectivity: ["GPS", "GPS + Cellular"],
        price: {
          "41mm GPS": 399,
          "41mm GPS + Cellular": 499,
          "45mm GPS": 429,
          "45mm GPS + Cellular": 529,
        },
      },
      {
        model: "Apple Watch Ultra 2",
        caseSize: "49mm",
        connectivity: "GPS + Cellular",
        price: 799,
      },
    ],
    AirPods: [
      {
        model: "AirPods Pro (2nd generation)",
        price: 249,
      },
      {
        model: "AirPods (3rd generation)",
        price: 179,
      },
      {
        model: "AirPods Max",
        price: 549,
      },
    ],
  },
};

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
      <ProductList products={productsData.products[selectedCategory]} />
    </div>
  );
};

export default Products;
