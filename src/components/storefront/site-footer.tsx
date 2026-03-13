import Link from "next/link";
import { Facebook, Instagram, MapPin, MessageCircle, Phone, Send } from "lucide-react";

import { StoreContainer } from "@/components/storefront/store-container";

export function SiteFooter({
  categories,
  settings,
}: {
  categories: Array<{ _id: string; name: string; slug: string }>;
  settings?: Record<string, any> | null;
}) {
  return (
    <footer className="mt-20 bg-gray-950 text-white">
      <StoreContainer className="py-12">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
          <div>
            <div className="text-2xl font-bold text-[#3AB7A5]">GLAM</div>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Votre parapharmacie en ligne premium pour les soins, la beaute et le bien-etre en Tunisie.
            </p>
            <div className="mt-5 flex gap-3">
              <a className="rounded-full bg-white/10 p-3 transition hover:bg-[#3AB7A5]" href="#">
                <Instagram className="h-4 w-4" />
              </a>
              <a className="rounded-full bg-white/10 p-3 transition hover:bg-[#3AB7A5]" href="#">
                <Facebook className="h-4 w-4" />
              </a>
              <a className="rounded-full bg-white/10 p-3 transition hover:bg-[#3AB7A5]" href="#">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Parapharmacie Glam</h3>
            <div className="mt-4 grid gap-2 text-sm text-gray-400">
              <Link href="/about">A propos</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/shop">Boutique</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Categories</h3>
            <div className="mt-4 grid gap-2 text-sm text-gray-400">
              {categories.slice(0, 6).map((category) => (
                <Link key={category._id} href={`/categorie/${category.slug}`}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Service client</h3>
            <div className="mt-4 grid gap-3 text-sm text-gray-400">
              <span className="inline-flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 text-[#3AB7A5]" />
                {settings?.whatsappLabel ?? "WhatsApp disponible 7j/7"}
              </span>
              <span className="inline-flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-[#3AB7A5]" />
                {settings?.phone ?? "+216 70 000 000"}
              </span>
              <span className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-[#3AB7A5]" />
                {settings?.address ?? "Tunis, Tunisie"}
              </span>
            </div>
          </div>
        </div>
        <div className="pt-8 text-center text-sm text-gray-500">
          © 2026 GLAM Parapharmacie. Tous droits reserves.
        </div>
      </StoreContainer>
    </footer>
  );
}
