import { BlogCards } from "@/components/storefront/blog-cards";
import { BrandLogoSlider } from "@/components/storefront/brand-logo-slider";
import { CategoryRail } from "@/components/storefront/category-rail";
import { FeaturedBrandsGrid } from "@/components/storefront/featured-brands-grid";
import { FlashSaleCountdown } from "@/components/storefront/flash-sale-countdown";
import { HeroSlider } from "@/components/storefront/hero-slider";
import { NewsletterBlock } from "@/components/storefront/newsletter-block";
import { ProductGrid } from "@/components/storefront/product-grid";
import { SectionHeading } from "@/components/storefront/section-heading";
import { StoreContainer } from "@/components/storefront/store-container";
import { TrustStrip } from "@/components/storefront/trust-strip";
import { UniverseGrid } from "@/components/storefront/universe-grid";
import { getHomepageData } from "@/lib/queries";

export default async function HomePage() {
  const data = (await getHomepageData()) as any;

  return (
    <div className="pb-20">
      <StoreContainer className="mt-6">
        <HeroSlider slides={data.slides} />
      </StoreContainer>

      <section className="mt-16">
        <StoreContainer>
          <CategoryRail categories={data.categories} />
        </StoreContainer>
      </section>

      <section className="mt-16">
        <StoreContainer>
          <SectionHeading title="Offres Exclusives Web" href="/promotions" />
          <ProductGrid products={data.featuredProducts} />
        </StoreContainer>
      </section>

      <section className="mt-16">
        <StoreContainer>
          <div className="rounded-[2rem] bg-gradient-to-r from-[#FF6B9D]/10 to-[#FFB347]/10 p-8">
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <SectionHeading
                title="Ventes Flash"
                subtitle="Profitez de prix imbattables avant la fin du compteur."
                href="/ventes-flash"
              />
              <FlashSaleCountdown endAt={data.flashSaleEndsAt} />
            </div>
            <ProductGrid products={data.flashSaleProducts} />
          </div>
        </StoreContainer>
      </section>

      <section className="mt-16">
        <StoreContainer>
          <SectionHeading title="Nos Marques Partenaires" />
          <FeaturedBrandsGrid brands={data.brands} />
        </StoreContainer>
      </section>

      <section className="mt-16">
        <StoreContainer>
          <SectionHeading title="Produits les plus vendus" href="/shop?sort=best-rated" />
          <ProductGrid products={data.bestSellers} />
        </StoreContainer>
      </section>

      <section className="mt-16">
        <StoreContainer>
          <SectionHeading title="Explorez nos univers" />
          <UniverseGrid banners={data.universeBanners} />
        </StoreContainer>
      </section>

      <section className="mt-16">
        <StoreContainer>
          <SectionHeading title="Les Marques de Confiance" />
          <BrandLogoSlider brands={data.brands} />
        </StoreContainer>
      </section>

      <section className="mt-16 bg-[#F8F9FA] py-16">
        <StoreContainer>
          <TrustStrip items={data.settings?.trustItems} />
        </StoreContainer>
      </section>

      <section className="mt-16">
        <StoreContainer>
          <SectionHeading title="Conseils Beaute & Sante" href="/blog" actionLabel="Voir tous les articles" />
          <BlogCards posts={data.blogPosts} />
        </StoreContainer>
      </section>

      <section className="mt-16">
        <StoreContainer>
          <NewsletterBlock
            title={data.settings?.newsletterTitle}
            description={data.settings?.newsletterDescription}
          />
        </StoreContainer>
      </section>
    </div>
  );
}
