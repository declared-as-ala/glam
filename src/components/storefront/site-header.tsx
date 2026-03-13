"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/components/providers/cart-provider";
import { StoreContainer } from "@/components/storefront/store-container";
import { cn } from "@/lib/utils";
import logo from "@/assets/da814afa58faa7a4b264cd307b5f10fa71d27a2f.png";

type SiteHeaderProps = {
  categories: Array<{ _id: string; name: string; slug: string }>;
  brands: Array<{ _id: string; name: string; slug: string }>;
};

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Shop" },
  { href: "/promotions", label: "Promotions" },
  { href: "/nouveautes", label: "Nouveautes" },
  { href: "/ventes-flash", label: "Ventes Flash" },
  { href: "/blog", label: "Conseils" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ categories }: SiteHeaderProps) {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur">
      <StoreContainer className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#e8f7f4]">
              <Image
                src={logo}
                alt="GLAM"
                fill
                className="object-contain p-1"
                sizes="56px"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold text-[#3AB7A5]">Glam</div>
              <div className="text-xs uppercase tracking-[0.25em] text-gray-500">
                Parapharmacie
              </div>
            </div>
          </Link>

          <form action="/recherche" className="hidden flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                name="q"
                placeholder="Rechercher un produit, une marque..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none ring-0 transition focus:border-[#3AB7A5]"
              />
            </div>
          </form>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/wishlist" className="relative rounded-full p-2 text-gray-700 hover:bg-gray-50">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/account" className="rounded-full p-2 text-gray-700 hover:bg-gray-50">
              <User className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("glam:toggle-cart"))}
              className="relative rounded-full p-2 text-gray-700 hover:bg-gray-50"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3AB7A5] px-1 text-xs font-semibold text-white">
                {count}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-50 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className={cn("mt-4 hidden items-center gap-6 border-t pt-4 md:flex")}>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition hover:text-[#3AB7A5]"
            >
              {item.label}
            </Link>
          ))}
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category._id}
              href={`/categorie/${category.slug}`}
              className="text-sm text-gray-500 transition hover:text-[#3AB7A5]"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {menuOpen ? (
          <div className="mt-4 grid gap-3 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl md:hidden">
            <form action="/recherche">
              <input
                name="q"
                placeholder="Rechercher un produit, une marque..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-3"
              />
            </form>
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/categorie/${category.slug}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-600"
              >
                {category.name}
              </Link>
            ))}
          </div>
        ) : null}
      </StoreContainer>
    </header>
  );
}
