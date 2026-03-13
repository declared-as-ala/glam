import { CartPageClient } from "@/components/storefront/cart-page-client";
import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";

export default function CartPage() {
  return (
    <>
      <PageHero title="Mon panier" description="Revoyez vos articles avant de finaliser votre commande." />
      <StoreContainer className="py-12">
        <CartPageClient />
      </StoreContainer>
    </>
  );
}
