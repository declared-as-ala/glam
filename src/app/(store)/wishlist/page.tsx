import { auth } from "@/lib/auth";
import { EmptyState } from "@/components/storefront/empty-state";
import { PageHero } from "@/components/storefront/page-hero";
import { ProductGrid } from "@/components/storefront/product-grid";
import { StoreContainer } from "@/components/storefront/store-container";
import { getWishlistForUser } from "@/lib/queries";
import { redirect } from "next/navigation";

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const products = await getWishlistForUser(session.user.id);

  return (
    <>
      <PageHero title="Ma wishlist" description="Retrouvez tous les produits que vous avez mis de cote." />
      <StoreContainer className="py-12">
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState title="Aucun favori pour le moment" description="Ajoutez des produits depuis la boutique pour les retrouver ici." />
        )}
      </StoreContainer>
    </>
  );
}
