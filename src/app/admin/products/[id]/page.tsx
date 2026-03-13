import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductForm } from "@/components/admin/product-form";
import { getProductById, getSelectableCatalog } from "@/lib/queries";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, selectable] = (await Promise.all([
    getProductById(id),
    getSelectableCatalog(),
  ])) as any;
  if (!product) notFound();

  return (
    <div>
      <AdminPageHeader title="Editer le produit" description={product.name} />
      <ProductForm initialData={product} brands={selectable.brands} categories={selectable.categories} />
    </div>
  );
}
