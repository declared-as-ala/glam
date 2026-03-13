import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { deleteHeroSlideAction } from "@/lib/actions";
import { getAdminCollections } from "@/lib/queries";

export default async function AdminHeroSlidesPage() {
  const { slides } = await getAdminCollections();

  return (
    <div>
      <AdminPageHeader title="Hero slides" description="Gerer le slider principal de la homepage." actionHref="/admin/hero-slides/new" actionLabel="Nouveau slide" />
      <AdminTable headers={["Titre", "Ordre", "Etat", "Actions"]}>
        {slides.map((slide: any) => (
          <tr key={slide._id}>
            <td className="px-6 py-4">{slide.title}</td>
            <td className="px-6 py-4">{slide.order}</td>
            <td className="px-6 py-4">{slide.isActive ? "Actif" : "Inactif"}</td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link href={`/admin/hero-slides/${slide._id}`} className="text-[#3AB7A5]">Editer</Link>
                <form action={async () => { "use server"; await deleteHeroSlideAction(slide._id); }}>
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
