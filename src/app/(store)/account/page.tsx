import { redirect } from "next/navigation";

import { AccountNav } from "@/components/storefront/account-nav";
import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";
import { auth } from "@/lib/auth";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <>
      <PageHero title="Mon compte" description="Retrouvez vos informations personnelles et votre activite." />
      <StoreContainer className="grid gap-8 py-12 lg:grid-cols-[320px_1fr]">
        <AccountNav />
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Bonjour {session.user.name}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-[#f4fbf9] p-5">
              <div className="text-sm text-gray-500">Email</div>
              <div className="mt-2 font-semibold text-gray-900">{session.user.email}</div>
            </div>
            <div className="rounded-2xl bg-[#fff7ef] p-5">
              <div className="text-sm text-gray-500">Role</div>
              <div className="mt-2 font-semibold text-gray-900">{session.user.role}</div>
            </div>
            <div className="rounded-2xl bg-[#fff4f7] p-5">
              <div className="text-sm text-gray-500">Compte</div>
              <div className="mt-2 font-semibold text-gray-900">Actif</div>
            </div>
          </div>
        </div>
      </StoreContainer>
    </>
  );
}
