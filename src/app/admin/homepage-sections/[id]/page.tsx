import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { HomepageSectionForm } from "@/components/admin/homepage-section-form";
import { getSectionById, getSelectableCatalog } from "@/lib/queries";

export default async function AdminEditHomepageSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [section, selectable] = (await Promise.all([
    getSectionById(id),
    getSelectableCatalog(),
  ])) as any;
  if (!section) notFound();

  return (
    <div>
      <AdminPageHeader title="Editer section homepage" description={section.key} />
      <HomepageSectionForm
        initialData={section}
        selectableProducts={selectable.products}
        selectableBrands={selectable.brands}
        selectableCategories={selectable.categories}
      />
    </div>
  );
}
