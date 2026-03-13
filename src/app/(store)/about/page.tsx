import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";

export default function AboutPage() {
  return (
    <>
      <PageHero title="A propos de GLAM Parapharmacie" description="Une destination premium pour les soins, la dermatologie cosmetique et le bien-etre en Tunisie." />
      <StoreContainer className="grid gap-8 py-12 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Notre mission</h2>
          <p className="mt-4 leading-7 text-gray-600">
            Proposer une selection exigeante de produits dermocosmetiques, de soins experts et de references familiales dans une experience ecommerce moderne, rassurante et facile a utiliser.
          </p>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Pourquoi GLAM ?</h2>
          <p className="mt-4 leading-7 text-gray-600">
            Parce que la parapharmacie peut etre premium, elegante et efficace, avec des conseils clairs, une navigation rapide et des selections pertinentes pour les besoins quotidiens.
          </p>
        </div>
      </StoreContainer>
    </>
  );
}
