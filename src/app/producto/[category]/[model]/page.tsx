"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { productsData, ProductData } from "@/data/products";

interface ProductDetailProps {
  params: {
    category: string;
    model: string;
  };
}

const getCategoryKey = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    iphone: "iPhone",
    ipad: "iPad",
    mac: "Mac",
    applewatch: "AppleWatch",
    airpods: "AirPods",
  };

  return categoryMap[category.toLowerCase()] || category;
};

const ProductDetail = ({ params }: ProductDetailProps) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    const categoryKey = getCategoryKey(params.category);
    const modelSlug = params.model;

    console.log("Categoría buscada:", categoryKey);
    console.log("Modelo buscado:", modelSlug);
    console.log("Categorías disponibles:", Object.keys(productsData.products));

    const foundProduct = productsData.products[categoryKey]?.find((p) => {
      const productSlug = p.model.toLowerCase().replace(/ /g, "-");
      console.log("Comparando con:", productSlug);
      return productSlug === modelSlug;
    });

    console.log("Producto encontrado:", foundProduct);

    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.storageOptions) {
        setSelectedStorage(foundProduct.storageOptions[0]);
      }
      if (foundProduct.colors) {
        setSelectedColor(foundProduct.colors[0]);
      }
    }
  }, [params]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 mt-[100px]">
        Producto no encontrado
      </div>
    );
  }

  const getPrice = () => {
    if (typeof product.price === "number") {
      return product.price;
    }
    return selectedStorage
      ? product.price[selectedStorage]
      : Object.values(product.price)[0];
  };

  return (
    <div className="container mx-auto px-4 mt-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#e2e3de] p-8">
          <Image
            src={`/images/${product.model
              .toLowerCase()
              .replace(/ /g, "-")}.jpg`}
            alt={product.model}
            width={600}
            height={600}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl uppercase tracking-widest font-light">
            {product.model}
          </h1>
          <p className="text-[#1a1311a6] text-xl">S/.{getPrice()}</p>

          {product.storageOptions && (
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-2">
                Almacenamiento
              </h3>
              <div className="flex gap-2">
                {product.storageOptions.map((storage: string) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-4 py-2 text-sm ${
                      selectedStorage === storage
                        ? "bg-[#1a1311] text-white"
                        : "border border-[#1a1311]"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm ${
                      selectedColor === color
                        ? "bg-[#1a1311] text-white"
                        : "border border-[#1a1311]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.processor && (
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-2">
                Procesador
              </h3>
              <p className="text-[#1a1311a6]">{product.processor}</p>
            </div>
          )}

          {product.caseSizes && (
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-2">
                Tamaño de caja
              </h3>
              <div className="flex gap-2">
                {product.caseSizes.map((size: string) => (
                  <button
                    key={size}
                    className="px-4 py-2 text-sm border border-[#1a1311]"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.connectivity && (
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-2">
                Conectividad
              </h3>
              <p className="text-[#1a1311a6]">
                {Array.isArray(product.connectivity)
                  ? product.connectivity.join(", ")
                  : product.connectivity}
              </p>
            </div>
          )}

          <button className="w-full bg-[#1a1311] text-white py-3 hover:bg-[#1a1311]/90 transition-colors">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
