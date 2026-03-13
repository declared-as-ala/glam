import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CategoryForm } from "@/components/admin/category-form";
import { getCategoryById, getSelectableCatalog } from "@/lib/queries";

export default async function AdminEditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category, selectable] = (await Promise.all([
    getCategoryById(id),
    getSelectableCatalog(),
  ])) as any;
  if (!category) notFound();

  return (
    <div>
      <AdminPageHeader title="Editer categorie" description={category.name} />
      <CategoryForm initialData={category} categories={selectable.categories} />
    </div>
  );
}
