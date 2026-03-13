"use client";

import { useCart } from "@/components/providers/cart-provider";

export function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      className="rounded-full bg-[#3AB7A5] px-8 py-4 font-semibold text-white"
      onClick={() => void addToCart(productId)}
    >
      Ajouter au panier
    </button>
  );
}
