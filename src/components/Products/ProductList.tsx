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
    <div className="bg-[#d9d9d940] py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {products.map((product) => (
          <ProductCard key={product.model} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
