import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  brand: string;
  name: string;
  price: number;
  promoPrice?: number;
  rating: number;
  reviews: number;
  badge?: "Promo" | "Bestseller" | "New";
  onAddToCart?: () => void;
}

export function ProductCard({
  image,
  brand,
  name,
  price,
  promoPrice,
  rating,
  reviews,
  badge,
  onAddToCart,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Badge */}
      {badge && (
        <div
          className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-medium ${
            badge === "Promo"
              ? "bg-[#FF6B9D] text-white"
              : badge === "Bestseller"
              ? "bg-[#3AB7A5] text-white"
              : "bg-[#FFB347] text-white"
          }`}
        >
          {badge}
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart
          className={`w-4 h-4 ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-[#3AB7A5] font-medium uppercase tracking-wide">
          {brand}
        </p>
        <h3 className="mt-1 text-sm text-gray-900 line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(rating)
                    ? "fill-[#FFB347] text-[#FFB347]"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          {promoPrice ? (
            <>
              <span className="text-lg font-semibold text-[#3AB7A5]">
                {promoPrice.toFixed(2)} TND
              </span>
              <span className="text-sm text-gray-400 line-through">
                {price.toFixed(2)} TND
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-gray-900">
              {price.toFixed(2)} TND
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full mt-4 bg-[#3AB7A5] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#2d9687] transition-colors opacity-0 group-hover:opacity-100"
          onClick={onAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="text-sm font-medium">Ajouter au panier</span>
        </button>
      </div>
    </div>
  );
}