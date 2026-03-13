"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen((value) => !value);
    window.addEventListener("glam:toggle-cart", handleOpen);
    return () => window.removeEventListener("glam:toggle-cart", handleOpen);
  }, []);

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
          aria-label="Fermer le panier"
        />
      ) : null}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Mon panier</h2>
            <button type="button" onClick={() => setOpen(false)}>
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <ShoppingCart className="mb-4 h-16 w-16 text-gray-300" />
              <p className="mb-6 text-gray-500">Votre panier est vide.</p>
              <button
                type="button"
                className="rounded-full bg-[#3AB7A5] px-6 py-3 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4 rounded-2xl border border-gray-100 p-3">
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-gray-50">
                      <Image
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <Link href={`/product/${item.slug}`} className="font-semibold text-gray-900">
                        {item.name}
                      </Link>
                      <span className="text-sm text-gray-500">{item.brand}</span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
                          <button
                            type="button"
                            onClick={() => void updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => void updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button type="button" onClick={() => void removeItem(item.productId)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                      <div className="mt-2 text-sm font-semibold text-[#3AB7A5]">
                        {formatPrice((item.promoPrice ?? item.price) * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t pt-6">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-[#3AB7A5]">{formatPrice(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="block rounded-full bg-[#3AB7A5] px-6 py-3 text-center font-semibold text-white"
                >
                  Passer a la caisse
                </Link>
                <Link
                  href="/cart"
                  className="block rounded-full border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700"
                >
                  Voir le panier
                </Link>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
