import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteCategoryAction } from "@/lib/actions";
import { getAdminCollections } from "@/lib/queries";

export default async function AdminCategoriesPage() {
  const { categories } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader title="Categories" description="Organisez la navigation catalogue et les univers." actionHref="/admin/categories/new" actionLabel="Nouvelle categorie" />
      <AdminTable headers={["Nom", "Slug", "Etat", "Actions"]}>
        {categories.map((category: any) => (
          <tr key={category._id}>
            <td className="px-6 py-4">{category.name}</td>
            <td className="px-6 py-4">{category.slug}</td>
            <td className="px-6 py-4">{category.isActive ? "Active" : "Inactive"}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link href={`/admin/categories/${category._id}`} className="text-[#3AB7A5]">Editer</Link>
                <form action={async () => { "use server"; await deleteCategoryAction(category._id); }}>
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
