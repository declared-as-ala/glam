import Link from "next/link";
import { redirect } from "next/navigation";

import { AccountNav } from "@/components/storefront/account-nav";
import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";
import { auth } from "@/lib/auth";
import { getOrdersForUser } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const orders = await getOrdersForUser(session.user.id);

  return (
    <>
      <PageHero title="Mes commandes" description="Suivez l'avancement et le detail de vos commandes." />
      <StoreContainer className="grid gap-8 py-12 lg:grid-cols-[320px_1fr]">
        <AccountNav />
        <div className="space-y-4">
          {orders.map((order: any) => (
            <Link
              key={order._id}
              href={`/account/orders/${order._id}`}
              className="block rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm text-gray-500">Commande #{order._id.slice(-6)}</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    {order.items.length} article(s)
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div>Statut: {order.status}</div>
                  <div>Paiement: {order.paymentStatus}</div>
                </div>
                <div className="text-xl font-bold text-[#3AB7A5]">{formatPrice(order.total)}</div>
              </div>
            </Link>
          ))}
        </div>
      </StoreContainer>
    </>
  );
}
