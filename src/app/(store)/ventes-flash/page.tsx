import { FlashSaleCountdown } from "@/components/storefront/flash-sale-countdown";
import { PageHero } from "@/components/storefront/page-hero";
import { ProductGrid } from "@/components/storefront/product-grid";
import { StoreContainer } from "@/components/storefront/store-container";
import { getHomepageData, getProducts } from "@/lib/queries";

export default async function FlashSalesPage() {
  const [{ products }, homepage] = await Promise.all([
    getProducts({ flashOnly: true }),
    getHomepageData(),
  ]);

  return (
    <>
      <PageHero title="Ventes Flash" description="Des offres limitees dans le temps, jusqu'a epuisement du stock." eyebrow="Flash sale" />
      <StoreContainer className="py-12">
        <div className="mb-8 flex justify-end">
          <FlashSaleCountdown endAt={homepage.flashSaleEndsAt} />
        </div>
        <ProductGrid products={products} />
      </StoreContainer>
    </>
  );
}
