import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";
import { getSiteSettings } from "@/lib/queries";

export default async function ContactPage() {
  const settings = (await getSiteSettings()) as any;

  return (
    <>
      <PageHero title="Contact" description="Notre equipe vous accompagne pour toutes vos questions produits et commandes." />
      <StoreContainer className="grid gap-8 py-12 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Service client</h2>
          <div className="mt-6 space-y-4 text-gray-600">
            <p>Telephone: {settings?.phone ?? "+216 70 000 000"}</p>
            <p>Email: {settings?.email ?? "contact@glam.tn"}</p>
            <p>Adresse: {settings?.address ?? "Tunis, Tunisie"}</p>
          </div>
        </div>
        <form className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="grid gap-4">
            <input placeholder="Nom" className="h-12 rounded-xl border border-gray-200 px-4" />
            <input placeholder="Email" className="h-12 rounded-xl border border-gray-200 px-4" />
            <textarea placeholder="Votre message" className="min-h-40 rounded-xl border border-gray-200 p-4" />
            <button className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">
              Envoyer
            </button>
          </div>
        </form>
      </StoreContainer>
    </>
  );
}
