import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { CheckoutForm } from "@/components/storefront/checkout-form";
import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <>
      <PageHero title="Checkout" description="Validez vos informations de livraison et confirmez votre commande." />
      <StoreContainer className="py-12">
        <CheckoutForm />
      </StoreContainer>
    </>
  );
}
