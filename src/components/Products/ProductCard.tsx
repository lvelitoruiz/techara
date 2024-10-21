import React from "react";
import Image from "next/image";
import Link from "next/link";

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

interface ProductCardProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getBasePrice = () => {
    if (typeof product.price === "number") {
      return product.price;
    }
    return Math.min(...Object.values(product.price));
  };

  return (
    <div className="p-6">
      <div className="bg-[#cccaca40] p-4 mb-6">
        <Image
          src={`/images/${product.model.toLowerCase().replace(/ /g, "-")}.jpg`}
          alt={product.model}
          width={300}
          height={600}
          className="w-full h-[350px] object-cover"
        />
      </div>
      <h3 className="text-xl uppercase text-center font-light">{product.model}</h3>
      <p className="text-gray-600 text-center mt-2">S/.{getBasePrice()}</p>
      <Link href={""} className="mt-6 uppercase text-blue-400 text-center w-full block hover:text-blue-500">
        Ver detalles
      </Link>
    </div>
  );
};

export default ProductCard;
