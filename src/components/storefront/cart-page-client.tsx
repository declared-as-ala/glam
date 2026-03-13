"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/components/providers/cart-provider";
import { EmptyState } from "@/components/storefront/empty-state";
import { formatPrice } from "@/lib/utils";

export function CartPageClient() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <EmptyState
        title="Votre panier est vide"
        description="Ajoutez des produits depuis la boutique pour commencer votre commande."
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-gray-100 md:flex-row">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-gray-50">
              <Image
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80"
                }
                alt={item.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link href={`/product/${item.slug}`} className="text-lg font-semibold text-gray-900">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 px-3 py-2">
                  <button type="button" onClick={() => void updateQuantity(item.productId, item.quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button type="button" onClick={() => void updateQuantity(item.productId, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="font-semibold text-[#3AB7A5]">
                  {formatPrice((item.promoPrice ?? item.price) * item.quantity)}
                </div>
                <button type="button" onClick={() => void removeItem(item.productId)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">Resume</h2>
        <div className="mt-6 flex items-center justify-between text-gray-600">
          <span>Sous-total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-gray-600">
          <span>Livraison</span>
          <span>{total >= 200 ? "Offerte" : formatPrice(7.9)}</span>
        </div>
        <div className="mt-6 flex items-center justify-between border-t pt-6 text-xl font-bold text-gray-900">
          <span>Total</span>
          <span className="text-[#3AB7A5]">{formatPrice(total >= 200 ? total : total + 7.9)}</span>
        </div>
        <Link href="/checkout" className="mt-6 block rounded-full bg-[#3AB7A5] px-6 py-4 text-center font-semibold text-white">
          Passer a la caisse
        </Link>
      </div>
    </div>
  );
}
