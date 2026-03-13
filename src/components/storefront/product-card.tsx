"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";

import { useCart } from "@/components/providers/cart-provider";
import { WishlistToggle } from "@/components/storefront/wishlist-toggle";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: {
    _id: string;
    slug: string;
    name: string;
    brandName?: string;
    price: number;
    promoPrice?: number;
    ratingAverage: number;
    reviewCount: number;
    primaryImage?: string;
    isNew?: boolean;
    isBestseller?: boolean;
    isFlashSale?: boolean;
    promotionLabel?: string;
  };
};

function getBadge(product: ProductCardProps["product"]) {
  if (product.promotionLabel) return product.promotionLabel;
  if (product.isFlashSale || product.promoPrice) return "Promo";
  if (product.isBestseller) return "Bestseller";
  if (product.isNew) return "Nouveau";
  return null;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const badge = getBadge(product);

  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {badge ? (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-[#FF6B9D] px-3 py-1 text-xs font-semibold text-white">
          {badge}
        </div>
      ) : null}
      <WishlistToggle productId={product._id} className="absolute right-3 top-3 z-10" />
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#f8fafb]">
          <Image
            src={
              product.primaryImage ||
              "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80"
            }
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3AB7A5]">
          {product.brandName}
        </p>
        <Link href={`/product/${product.slug}`} className="mt-1 block text-sm font-medium text-gray-900">
          {product.name}
        </Link>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1 text-[#FFB347]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-3 w-3 ${
                  index < Math.round(product.ratingAverage)
                    ? "fill-current text-[#FFB347]"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-semibold text-[#3AB7A5]">
            {formatPrice(product.promoPrice ?? product.price)}
          </span>
          {product.promoPrice ? (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3AB7A5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2d9687]"
          onClick={() => void addToCart(product._id)}
        >
          <ShoppingCart className="h-4 w-4" />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
