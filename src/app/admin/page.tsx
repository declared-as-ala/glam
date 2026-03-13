import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { getAdminDashboardData } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

  return (
    <div>
      <AdminPageHeader title="Dashboard" description="Vue d'ensemble des performances, commandes et alertes stock." />
      <div className="grid gap-4 md:grid-cols-5">
        {[
          ["Chiffre d'affaires", formatPrice(data.stats.totalSales)],
          ["Commandes", String(data.stats.totalOrders)],
          ["Utilisateurs", String(data.stats.totalUsers)],
          ["Produits", String(data.stats.totalProducts)],
          ["Ventes flash", String(data.stats.activeFlashSales)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="mt-3 text-2xl font-bold text-gray-950">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-950">Commandes recentes</h2>
          <AdminTable headers={["Client", "Total", "Statut"]}>
            {data.recentOrders.map((order: any) => (
              <tr key={order._id}>
                <td className="px-6 py-4">{order.user?.name ?? "Client"}</td>
                <td className="px-6 py-4">{formatPrice(order.total)}</td>
                <td className="px-6 py-4">{order.status}</td>
              </tr>
            ))}
          </AdminTable>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-950">Produits faibles en stock</h2>
          <AdminTable headers={["Produit", "SKU", "Stock"]}>
            {data.lowStockProducts.map((product: any) => (
              <tr key={product._id}>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.sku}</td>
                <td className="px-6 py-4">{product.stockQuantity}</td>
              </tr>
            ))}
          </AdminTable>
        </div>
      </div>
    </div>
  );
}
