import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteHomepageSectionAction } from "@/lib/actions";
import { getAdminCollections } from "@/lib/queries";

export default async function AdminHomepageSectionsPage() {
  const { sections } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader title="Homepage sections" description="Configuration des blocs dynamiques de la page d'accueil." actionHref="/admin/homepage-sections/new" actionLabel="Nouvelle section" />
      <AdminTable headers={["Cle", "Titre", "Position", "Visible", "Actions"]}>
        {sections.map((section: any) => (
          <tr key={section._id}>
            <td className="px-6 py-4">{section.key}</td>
            <td className="px-6 py-4">{section.title}</td>
            <td className="px-6 py-4">{section.position}</td>
            <td className="px-6 py-4">{section.isVisible ? "Oui" : "Non"}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link href={`/admin/homepage-sections/${section._id}`} className="text-[#3AB7A5]">Editer</Link>
                <form action={async () => { "use server"; await deleteHomepageSectionAction(section._id); }}>
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
