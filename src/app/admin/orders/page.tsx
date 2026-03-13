import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { getAdminCollections } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const { orders } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader title="Orders" description="Suivi, paiement et gestion du flux de commandes." />
      <AdminTable headers={["Commande", "Client", "Total", "Statuts"]}>
        {orders.map((order: any) => (
          <tr key={order._id}>
            <td className="px-6 py-4">#{order._id.slice(-6)}</td>
            <td className="px-6 py-4">{order.user?.name ?? order.shippingAddress?.fullName}</td>
            <td className="px-6 py-4">{formatPrice(order.total)}</td>
            <td className="px-6 py-4">
              <OrderStatusForm orderId={order._id} status={order.status} paymentStatus={order.paymentStatus} />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
