import { notFound } from "next/navigation";

import { EmptyState } from "@/components/storefront/empty-state";
import { PageHero } from "@/components/storefront/page-hero";
import { ProductGrid } from "@/components/storefront/product-grid";
import { StoreContainer } from "@/components/storefront/store-container";
import { getCategoryBySlug } from "@/lib/queries";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = (await getCategoryBySlug(slug)) as any;
  if (!data) notFound();

  return (
    <>
      <PageHero title={data.category.name} description={data.category.description} eyebrow="Categorie" />
      <StoreContainer className="py-12">
        {data.products.length ? (
          <ProductGrid products={data.products} />
        ) : (
          <EmptyState title="Aucun produit dans cette categorie" description="Cette selection sera bientot enrichie." />
        )}
      </StoreContainer>
    </>
  );
}
