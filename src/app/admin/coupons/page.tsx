import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteCouponAction } from "@/lib/actions";
import { getAdminCollections } from "@/lib/queries";

export default async function AdminCouponsPage() {
  const { coupons } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader title="Coupons" description="Codes promo, periodes et limites d'utilisation." actionHref="/admin/coupons/new" actionLabel="Nouveau coupon" />
      <AdminTable headers={["Code", "Type", "Valeur", "Actif", "Actions"]}>
        {coupons.map((coupon: any) => (
          <tr key={coupon._id}>
            <td className="px-6 py-4">{coupon.code}</td>
            <td className="px-6 py-4">{coupon.type}</td>
            <td className="px-6 py-4">{coupon.value}</td>
            <td className="px-6 py-4">{coupon.isActive ? "Oui" : "Non"}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link href={`/admin/coupons/${coupon._id}`} className="text-[#3AB7A5]">Editer</Link>
                <form action={async () => { "use server"; await deleteCouponAction(coupon._id); }}>
                  <button className="text-red-600">Supprimer</button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
