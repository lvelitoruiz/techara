import React from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ProductData } from "@/data/products";

interface ProductListProps {
  products: ProductData[];
  category: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, category }) => {
  // Normalizar la categoría para la URL
  const categorySlug = category.toLowerCase();

  return (
    <div className="bg-[#d9d9d940] py-14">
      <div className="container mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {products.map((product) => (
          <ProductCard 
            key={product.model} 
            product={product} 
            category={category}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mt-5">
        <Link 
          href={`/producto/${categorySlug}`} 
          className="g-button left"
        >
          <span className="font-light tracking-widest">View More</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;