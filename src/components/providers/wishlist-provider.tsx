"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type WishlistContextValue = {
  ids: string[];
  isLoading: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

async function request(method: string, productId?: string) {
  const response = await fetch("/api/wishlist", {
    method,
    headers: { "Content-Type": "application/json" },
    body: productId ? JSON.stringify({ productId }) : undefined,
  });

  if (response.status === 401) {
    throw new Error("Veuillez vous connecter pour gerer vos favoris.");
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Erreur favoris.");
  }
  return data;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [ids, setIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await request("GET");
      setIds(data.items ?? []);
    } catch {
      setIds([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh, status]);

  const toggle = useCallback(
    async (productId: string) => {
      const alreadySaved = ids.includes(productId);
      try {
        const data = await request(alreadySaved ? "DELETE" : "POST", productId);
        setIds(data.items ?? []);
        toast.success(
          alreadySaved ? "Produit retire des favoris." : "Produit ajoute aux favoris.",
        );
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erreur favoris.");
      }
    },
    [ids],
  );

  const value = useMemo(
    () => ({
      ids,
      isLoading,
      has: (productId: string) => ids.includes(productId),
      toggle,
      refresh,
    }),
    [ids, isLoading, refresh, toggle],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider.");
  }
  return context;
}
