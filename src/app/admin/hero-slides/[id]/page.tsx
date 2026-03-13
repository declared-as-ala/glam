import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";
import { getHeroSlideById } from "@/lib/queries";

export default async function AdminEditHeroSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = (await getHeroSlideById(id)) as any;
  if (!slide) notFound();

  return (
    <div>
      <AdminPageHeader title="Editer hero slide" description={slide.title} />
      <HeroSlideForm initialData={slide} />
    </div>
  );
}
