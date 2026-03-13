"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type CartItem = {
  productId: string;
  slug: string;
  name: string;
  brand?: string;
  image: string;
  price: number;
  promoPrice?: number;
  quantity: number;
  stockQuantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isLoading: boolean;
  count: number;
  total: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

async function fetchCart(method: string, body?: Record<string, unknown>) {
  const response = await fetch("/api/cart", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erreur panier." }));
    throw new Error(error.message ?? "Erreur panier.");
  }
  return response.json();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCart("GET");
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart, status]);

  const addToCart = useCallback(async (productId: string, quantity = 1) => {
    const data = await fetchCart("POST", { productId, quantity });
    setItems(data.items ?? []);
    toast.success("Produit ajoute au panier.");
  }, []);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    const data = await fetchCart("PATCH", { productId, quantity });
    setItems(data.items ?? []);
  }, []);

  const removeItem = useCallback(async (productId: string) => {
    const data = await fetchCart("DELETE", { productId });
    setItems(data.items ?? []);
  }, []);

  const clearCart = useCallback(async () => {
    const data = await fetchCart("DELETE", {});
    setItems(data.items ?? []);
  }, []);

  const value = useMemo(
    () => ({
      items,
      isLoading,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce(
        (sum, item) => sum + (item.promoPrice ?? item.price) * item.quantity,
        0,
      ),
      refreshCart,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [addToCart, clearCart, isLoading, items, refreshCart, removeItem, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }
  return context;
}
