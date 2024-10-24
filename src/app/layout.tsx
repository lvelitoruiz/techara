import "@/app/globals.css";
import React from "react";
import ApolloWrapper from "@/components/ApolloWrapper";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css"
        />
      </head>
      <body>
        <CartProvider>
          <ApolloWrapper>
            <Header />
            <main>{children}</main>
            <Footer />
          </ApolloWrapper>
        </CartProvider>
      </body>
    </html>
  );
}