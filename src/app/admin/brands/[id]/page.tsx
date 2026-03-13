import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BrandForm } from "@/components/admin/brand-form";
import { getBrandById } from "@/lib/queries";

export default async function AdminEditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = (await getBrandById(id)) as any;
  if (!brand) notFound();

  return (
    <div>
      <AdminPageHeader title="Editer marque" description={brand.name} />
      <BrandForm initialData={brand} />
    </div>
  );
}
