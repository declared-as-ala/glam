"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { CartProvider } from "@/components/providers/cart-provider";
import { WishlistProvider } from "@/components/providers/wishlist-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
