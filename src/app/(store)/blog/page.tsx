import { BlogCards } from "@/components/storefront/blog-cards";
import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";
import { getBlogPosts } from "@/lib/queries";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <PageHero title="Conseils Beaute & Sante" description="Des articles utiles pour construire votre routine et mieux choisir vos produits." />
      <StoreContainer className="py-12">
        <BlogCards posts={posts} />
      </StoreContainer>
    </>
  );
}
