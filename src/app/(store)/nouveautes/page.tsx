import { PageHero } from "@/components/storefront/page-hero";
import { ProductGrid } from "@/components/storefront/product-grid";
import { StoreContainer } from "@/components/storefront/store-container";
import { getProducts } from "@/lib/queries";

export default async function NewArrivalsPage() {
  const { products } = await getProducts({ newOnly: true });

  return (
    <>
      <PageHero title="Nouveautes" description="Les derniers produits ajoutes a la selection GLAM." eyebrow="Nouveau" />
      <StoreContainer className="py-12">
        <ProductGrid products={products} />
      </StoreContainer>
    </>
  );
}
