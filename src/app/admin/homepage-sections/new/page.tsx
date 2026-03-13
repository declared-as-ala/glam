import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { HomepageSectionForm } from "@/components/admin/homepage-section-form";
import { getSelectableCatalog } from "@/lib/queries";

export default async function AdminNewHomepageSectionPage() {
  const selectable = await getSelectableCatalog();

  return (
    <div>
      <AdminPageHeader title="Nouvelle section homepage" />
      <HomepageSectionForm
        selectableProducts={selectable.products}
        selectableBrands={selectable.brands}
        selectableCategories={selectable.categories}
      />
    </div>
  );
}
