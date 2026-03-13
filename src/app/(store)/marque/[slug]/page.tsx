import { notFound } from "next/navigation";

import { EmptyState } from "@/components/storefront/empty-state";
import { PageHero } from "@/components/storefront/page-hero";
import { ProductGrid } from "@/components/storefront/product-grid";
import { StoreContainer } from "@/components/storefront/store-container";
import { getBrandBySlug } from "@/lib/queries";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = (await getBrandBySlug(slug)) as any;
  if (!data) notFound();

  return (
    <>
      <PageHero title={data.brand.name} description={data.brand.shortText} eyebrow="Marque" />
      <StoreContainer className="py-12">
        {data.products.length ? (
          <ProductGrid products={data.products} />
        ) : (
          <EmptyState title="Aucun produit pour cette marque" description="Les references de cette marque seront bientot disponibles." />
        )}
      </StoreContainer>
    </>
  );
}
