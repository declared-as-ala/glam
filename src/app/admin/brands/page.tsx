import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteBrandAction } from "@/lib/actions";
import { getAdminCollections } from "@/lib/queries";

export default async function AdminBrandsPage() {
  const { brands } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader title="Brands" description="Gerer les marques et leur visibilite." actionHref="/admin/brands/new" actionLabel="Nouvelle marque" />
      <AdminTable headers={["Nom", "Etat", "Featured", "Actions"]}>
        {brands.map((brand: any) => (
          <tr key={brand._id}>
            <td className="px-6 py-4">{brand.name}</td>
            <td className="px-6 py-4">{brand.isActive ? "Active" : "Inactive"}</td>
            <td className="px-6 py-4">{brand.isFeatured ? "Oui" : "Non"}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link href={`/admin/brands/${brand._id}`} className="text-[#3AB7A5]">Editer</Link>
                <form action={async () => { "use server"; await deleteBrandAction(brand._id); }}>
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
