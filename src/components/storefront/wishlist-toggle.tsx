"use client";

import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { useWishlist } from "@/components/providers/wishlist-provider";

export function WishlistToggle({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <button
      type="button"
      onClick={() => void toggle(productId)}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md backdrop-blur transition hover:scale-105 hover:text-[#FF6B9D]",
        className,
      )}
      aria-label="Ajouter aux favoris"
    >
      <Heart className={cn("h-4 w-4", active && "fill-[#FF6B9D] text-[#FF6B9D]")} />
    </button>
  );
}
