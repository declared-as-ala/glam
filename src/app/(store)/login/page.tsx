import Link from "next/link";

import { LoginForm } from "@/components/storefront/auth-forms";
import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";

export default function LoginPage() {
  return (
    <>
      <PageHero title="Connexion" description="Accedez a votre espace client GLAM." />
      <StoreContainer className="py-12">
        <div className="mx-auto max-w-lg">
          <LoginForm />
          <p className="mt-6 text-center text-sm text-gray-600">
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-semibold text-[#3AB7A5]">
              Creer un compte
            </Link>
          </p>
        </div>
      </StoreContainer>
    </>
  );
}
