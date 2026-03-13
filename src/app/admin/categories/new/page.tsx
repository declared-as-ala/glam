import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CategoryForm } from "@/components/admin/category-form";
import { getSelectableCatalog } from "@/lib/queries";

export default async function AdminNewCategoryPage() {
  const { categories } = await getSelectableCatalog();

  return (
    <div>
      <AdminPageHeader title="Nouvelle categorie" />
      <CategoryForm categories={categories} />
    </div>
  );
}
