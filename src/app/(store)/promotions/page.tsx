import { PageHero } from "@/components/storefront/page-hero";
import { ProductGrid } from "@/components/storefront/product-grid";
import { StoreContainer } from "@/components/storefront/store-container";
import { getProducts } from "@/lib/queries";

export default async function PromotionsPage() {
  const { products } = await getProducts({ promoOnly: true });

  return (
    <>
      <PageHero title="Promotions" description="Les meilleures offres du moment sur vos essentiels beaute et sante." eyebrow="Offres" />
      <StoreContainer className="py-12">
        <ProductGrid products={products} />
      </StoreContainer>
    </>
  );
}
