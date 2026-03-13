import { EmptyState } from "@/components/storefront/empty-state";
import { PageHero } from "@/components/storefront/page-hero";
import { ProductGrid } from "@/components/storefront/product-grid";
import { StoreContainer } from "@/components/storefront/store-container";
import { getProducts } from "@/lib/queries";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const { products } = await getProducts({ search: query });

  return (
    <>
      <PageHero title={`Resultats pour "${query}"`} description="Affinez votre recherche parmi nos marques et categories." eyebrow="Recherche" />
      <StoreContainer className="py-12">
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState title="Aucun resultat" description="Essayez un autre mot-cle ou parcourez la boutique complete." />
        )}
      </StoreContainer>
    </>
  );
}
