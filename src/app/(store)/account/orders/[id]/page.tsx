import { notFound, redirect } from "next/navigation";

import { AccountNav } from "@/components/storefront/account-nav";
import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";
import { auth } from "@/lib/auth";
import { getOrderForUser } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const order = (await getOrderForUser(id, session.user.id)) as any;
  if (!order) notFound();

  return (
    <>
      <PageHero title={`Commande #${order._id.slice(-6)}`} description="Detail, adresse et suivi de statut." />
      <StoreContainer className="grid gap-8 py-12 lg:grid-cols-[320px_1fr]">
        <AccountNav />
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm text-gray-500">Statut</div>
              <div className="mt-2 font-semibold">{order.status}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Paiement</div>
              <div className="mt-2 font-semibold">{order.paymentStatus}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="mt-2 font-semibold text-[#3AB7A5]">{formatPrice(order.total)}</div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {order.items.map((item: any) => (
              <div key={item.productSlug} className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4">
                <div>
                  <div className="font-semibold text-gray-900">{item.productName}</div>
                  <div className="text-sm text-gray-500">Quantite: {item.quantity}</div>
                </div>
                <div className="font-semibold text-[#3AB7A5]">{formatPrice(item.lineTotal)}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-lg font-semibold text-gray-900">Adresse de livraison</h2>
            <p className="mt-3 text-gray-600">
              {order.shippingAddress.fullName}
              <br />
              {order.shippingAddress.line1}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.country}
              <br />
              {order.shippingAddress.phone}
            </p>
          </div>
        </div>
      </StoreContainer>
    </>
  );
}
