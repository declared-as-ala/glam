import Link from "next/link";

import { PageHero } from "@/components/storefront/page-hero";
import { RegisterForm } from "@/components/storefront/auth-forms";
import { StoreContainer } from "@/components/storefront/store-container";

export default function RegisterPage() {
  return (
    <>
      <PageHero title="Creer un compte" description="Inscrivez-vous pour suivre vos commandes, avis et favoris." />
      <StoreContainer className="py-12">
        <div className="mx-auto max-w-lg">
          <RegisterForm />
          <p className="mt-6 text-center text-sm text-gray-600">
            Vous avez deja un compte ?{" "}
            <Link href="/login" className="font-semibold text-[#3AB7A5]">
              Se connecter
            </Link>
          </p>
        </div>
      </StoreContainer>
    </>
  );
}
