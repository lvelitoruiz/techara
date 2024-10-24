"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { productsData, ProductData } from "@/data/products";
import Accordion from "@/components/Acoordion";
import { useCart } from "@/context/CartContext";

interface ProductDetailProps {
  params: {
    category: string;
    model: string;
  };
}

interface AccordionItem {
    title: string;
    content: React.ReactNode;
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

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
  
    addToCart({
      product,
      quantity: 1,
      selectedStorage,
      selectedColor,
      selectedSize: product.caseSizes?.[0],
      selectedConnectivity: Array.isArray(product.connectivity) 
        ? product.connectivity[0] 
        : product.connectivity
    });
  };

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
      <div className="container mx-auto pt-10 px-4 lg:px-0">
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

  const items: AccordionItem[] = [
    {
      title: "Sección 1",
      content: 
        <div className="flex gap-3 flex-col">
          <p>* The lid is made of sliced natural wood veneer. Please understand that a little warpage could be caused by the change of temperature or humidity.</p>
          <p>* The lid is made of sliced natural wood veneer. Please understand that a little warpage could be caused by the change of temperature or humidity.</p>
        </div>
    },
    {
      title: "Sección 2",
      content:
        <div className="flex gap-3 flex-col">
          <p>* The lid is made of sliced natural wood veneer. Please understand that a little warpage could be caused by the change of temperature or humidity.</p>
          <p>* The lid is made of sliced natural wood veneer. Please understand that a little warpage could be caused by the change of temperature or humidity.</p>
        </div>
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10 lg:px-0 min-h-[calc(100vh-448px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:gap-20">
        <div className="w-full max-h-[530px]">
          <Image
            src={`/images/${product.model
              .toLowerCase()
              .replace(/ /g, "-")}.jpg`}
            alt={product.model}
            width={600}
            height={600}
            className="w-full h-full object-cover bg-[#e2e3de]"
          />
        </div>
        <div className="flex flex-col gap-6 pt-5">
          <div className="border-b border-[#d1d1cd] pb-5">
            <h1 className="text-2xl uppercase tracking-widest font-light">
              {product.model}
            </h1>
            <p className="text-[#1a1311a6] text-xl font-light">S/.{getPrice()}</p>
          </div>
          <div>
            <p className="text-sm font-light">“A waste bin nobody has ever seen” is the concept of SWING BIN. By eliminating as much of the unnecessary elements as possible, sculptural beauty was born. SWING BIN features the unique lid, which keeps its perfect balance and tilts without any mechanism.</p>
          </div>

          {product.storageOptions && (
            <div>
              <h3 className="text-sm font-light mb-2">
                Almacenamiento
              </h3>
              <div className="flex gap-2">
                {product.storageOptions.map((storage: string) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-4 py-2 text-sm ${
                      selectedStorage === storage
                        ? "border border-[#161a14] text-[#161a14]"
                        : "border border-[#d1d1cd] text-[#1a1311a6]"
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
              <h3 className="text-sm font-light mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm ${
                      selectedColor === color
                        ? "border border-[#161a14] text-[#161a14]"
                        : "border border-[#d1d1cd] text-[#1a1311a6]"
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
              <h3 className="text-sm font-light mb-2">
                Procesador
              </h3>
              <p className="text-[#1a1311a6]">{product.processor}</p>
            </div>
          )}

          {product.caseSizes && (
            <div>
              <h3 className="text-sm font-light mb-2">
                Tamaño de caja
              </h3>
              <div className="flex gap-2">
                {product.caseSizes.map((size: string) => (
                  <button
                    key={size}
                    className="px-4 py-2 text-sm border border-[#d1d1cd]"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.connectivity && (
            <div>
              <h3 className="text-sm font-light mb-2">
                Conectividad
              </h3>
              <p className="text-[#1a1311a6]">
                {Array.isArray(product.connectivity)
                  ? product.connectivity.join(", ")
                  : product.connectivity}
              </p>
            </div>
          )}

          <button className="w-full g-button left" onClick={handleAddToCart}>
            Agregar al carrito
          </button>

          <div>
            <Accordion items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
