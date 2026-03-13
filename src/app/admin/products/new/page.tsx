import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductForm } from "@/components/admin/product-form";
import { getSelectableCatalog } from "@/lib/queries";

export default async function AdminNewProductPage() {
  const { brands, categories } = await getSelectableCatalog();

  return (
    <div>
      <AdminPageHeader title="Nouveau produit" description="Creez une nouvelle fiche produit complete." />
      <ProductForm brands={brands} categories={categories} />
    </div>
  );
}
