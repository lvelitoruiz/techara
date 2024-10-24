'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useEffect, useState } from 'react';
import { CartProvider } from '@/context/CartContext';

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
      cache: new InMemoryCache(),
    });

    setClient(client);
  }, []);

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <CartProvider>
        {children}
      </CartProvider>
    </ApolloProvider>
  );
}