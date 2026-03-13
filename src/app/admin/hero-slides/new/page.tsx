import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";

export default function AdminNewHeroSlidePage() {
  return (
    <div>
      <AdminPageHeader title="Nouveau hero slide" />
      <HeroSlideForm />
    </div>
  );
}
