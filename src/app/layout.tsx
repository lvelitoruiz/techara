import "@/app/globals.css"; // Asegúrate de que la ruta sea correcta
import React from "react";
import ApolloWrapper from "@/components/ApolloWrapper";
import Header from "@/components/Header";

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
        <ApolloWrapper>
          <Header />
          <main>{children}</main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
