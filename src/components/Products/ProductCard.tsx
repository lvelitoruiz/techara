import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductData } from "@/data/products";

interface ProductCardProps {
  product: ProductData;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, category }) => {
  const getBasePrice = () => {
    if (typeof product.price === "number") {
      return product.price;
    }
    return Math.min(...Object.values(product.price));
  };

  const modelSlug = product.model.toLowerCase().replace(/ /g, "-");
  const categorySlug = category.toLowerCase();

  return (
    <div>
      <Link href={`/producto/${categorySlug}/${modelSlug}`}>
        <div className="bg-[#e2e3de] p-4 mb-5">
          <Image
            src={`/images/${modelSlug}.jpg`}
            alt={product.model}
            width={300}
            height={600}
            className="w-full h-[350px] object-cover"
          />
        </div>
        <h3 className="text-xs tracking-widest uppercase text-center font-light">
          {product.model}
        </h3>
        <p className="text-[#1a1311a6] text-xs text-center mt-1 mb-4">
          S/.{getBasePrice()}
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;