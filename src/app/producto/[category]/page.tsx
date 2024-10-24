'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductList from "@/components/Products/ProductList";
import { productsData } from "@/data/products";
import LinearIcon from "@/components/LinearIcon";

const CategoryPage = () => {
  const router = useRouter();
  const params = useParams();
  const [isComboOpen, setIsComboOpen] = useState(false);
  
  // Obtener y normalizar la categoría
  const rawCategory = (params.category as string)?.toLowerCase() || "iphone";
  
  // Mapa de conversión de slugs a nombres de categoría
  const categoryMap: { [key: string]: string } = {
    'iphone': 'iPhone',
    'ipad': 'iPad',
    'mac': 'Mac',
    'applewatch': 'AppleWatch',
    'airpods': 'AirPods'
  };

  const normalizedCategory = categoryMap[rawCategory] || 'iPhone';

  // Logs de depuración detallados
  useEffect(() => {
    console.log('Raw Category from URL:', rawCategory);
    console.log('Normalized Category:', normalizedCategory);
    console.log('Products Data Structure:', productsData);
    console.log('Available Categories:', Object.keys(productsData.products));
    console.log('Current Category Products:', productsData.products[normalizedCategory]);
  }, [rawCategory, normalizedCategory]);

  // Validar que la categoría existe y redirigir si es necesario
  useEffect(() => {
    if (!productsData.products[normalizedCategory]) {
      console.log('Invalid category, redirecting to iPhone');
      router.push('/producto/iphone');
    }
  }, [normalizedCategory, router]);

  const handleCategoryChange = (category: string) => {
    const slug = category.toLowerCase();
    router.push(`/producto/${slug}`);
    setIsComboOpen(false);
  };

  // Asegurarse de que tenemos productos antes de renderizar
  const products = productsData.products[normalizedCategory];
  
  if (!products) {
    console.log('No products found for category:', normalizedCategory);
    return null;
  }

  console.log('Rendering with products:', products.length);

  // Log antes del render
  console.log('About to render ProductList with:', {
    productsCount: products.length,
    category: normalizedCategory
  });

  return (
    <div className="w-full p-0 bg-[#F1F2EE]">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="pt-20 pb-10 md:pt-[120px] md:pb-[70px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h1 className="text-3xl uppercase font-light">
              {normalizedCategory}
            </h1>
            <div className="relative w-full md:w-64">
              <button
                onClick={() => setIsComboOpen(!isComboOpen)}
                className="w-full px-4 py-2 bg-white border border-[#d1d1cd] flex items-center justify-between"
              >
                <span className="text-xs uppercase tracking-widest font-light">
                  Seleccionar Categoría
                </span>
                <LinearIcon
                  name={isComboOpen ? "chevron-up" : "chevron-down"}
                  size={16}
                />
              </button>
              {isComboOpen && (
                <div className="absolute w-full mt-1 bg-white border border-[#d1d1cd] shadow-lg z-10">
                  {Object.keys(productsData.products).map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full px-4 py-2 text-left hover:bg-[#f1f2ee] text-xs uppercase tracking-widest font-light ${
                        category === normalizedCategory ? 'bg-[#f1f2ee]' : ''
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="text-[#1a1311a6] mt-6 font-light">
            {getCategoryDescription(normalizedCategory)}
          </p>
        </div>
      </div>
      
      <ProductList 
        products={products}
        category={normalizedCategory}
      />
    </div>
  );
};

function getCategoryDescription(category: string): string {
  const descriptions: { [key: string]: string } = {
    iPhone: "Descubre la última generación de iPhones, que combina un diseño elegante con tecnología de vanguardia. Cada modelo está diseñado para ofrecer una experiencia excepcional en fotografía, rendimiento y uso diario.",
    iPad: "Explora nuestra línea de iPads, desde el compacto iPad mini hasta el potente iPad Pro. Perfectos para crear, trabajar y entretenerte con una pantalla increíble y rendimiento excepcional.",
    Mac: "Conoce nuestra familia de computadoras Mac, que ofrecen el equilibrio perfecto entre potencia y portabilidad. Diseñadas para profesionales y usuarios exigentes.",
    AppleWatch: "Descubre el Apple Watch, el compañero perfecto para tu estilo de vida activo. Monitorea tu salud, mantente conectado y luce elegante con nuestras diferentes opciones.",
    AirPods: "Experimenta un sonido increíble con nuestros AirPods. Desde los compactos AirPods hasta los inmersivos AirPods Max, encuentra el audio perfecto para tu estilo."
  };

  return descriptions[category] || "";
}

export default CategoryPage;