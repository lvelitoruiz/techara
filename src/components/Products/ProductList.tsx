import React from "react";
import ProductCard from "./ProductCard";

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

interface ProductListProps {
  products: ProductData[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="bg-[#d9d9d940] py-14">
      <div className="container mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {products.map((product) => (
          <ProductCard key={product.model} product={product} />
        ))}
      </div>
        <div className="flex items-center justify-center mt-5">
          <a className="g-button left" href="">
            <span className="font-light tracking-widest">View More</span>
          </a>
        </div>
    </div>
  );
};

export default ProductList;
