import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { BrandForm } from "@/components/admin/brand-form";

export default function AdminNewBrandPage() {
  return (
    <div>
      <AdminPageHeader title="Nouvelle marque" />
      <BrandForm />
    </div>
  );
}
