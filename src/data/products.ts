// Define los tipos
export type ProductData = {
    model: string;
    storageOptions?: string[];
    colors?: string[];
    price: number | { [key: string]: number };
    processor?: string;
    caseSizes?: string[];
    connectivity?: string | string[];
    caseSize?: string;
  };
  
  export type ProductsData = {
    products: {
      [key: string]: ProductData[];
    };
  };
  

  export const productsData: ProductsData = {
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