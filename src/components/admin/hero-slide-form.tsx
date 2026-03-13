"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ImageUploadField } from "@/components/admin/image-upload-field";
import { upsertHeroSlideAction } from "@/lib/actions";

export function HeroSlideForm({ initialData }: { initialData?: Record<string, any> | null }) {
  const router = useRouter();
  const [desktopImage, setDesktopImage] = useState(initialData?.desktopImage ?? "");
  const [mobileImage, setMobileImage] = useState(initialData?.mobileImage ?? "");

  async function action(formData: FormData) {
    try {
      await upsertHeroSlideAction({
        id: initialData?._id,
        title: formData.get("title"),
        subtitle: formData.get("subtitle"),
        ctaText: formData.get("ctaText"),
        ctaLink: formData.get("ctaLink"),
        desktopImage,
        mobileImage,
        order: Number(formData.get("order")),
        isActive: formData.get("isActive") === "on",
      });
      toast.success("Slide enregistre.");
      router.push("/admin/hero-slides");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur slide.");
    }
  }

  return (
    <form action={action} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <input name="title" defaultValue={initialData?.title} placeholder="Titre" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <textarea name="subtitle" defaultValue={initialData?.subtitle} placeholder="Sous-titre" className="min-h-28 w-full rounded-xl border border-gray-200 p-4" />
      <div className="grid gap-4 md:grid-cols-3">
        <input name="ctaText" defaultValue={initialData?.ctaText} placeholder="CTA" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="ctaLink" defaultValue={initialData?.ctaLink} placeholder="Lien CTA" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="order" defaultValue={initialData?.order ?? 0} placeholder="Ordre" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <ImageUploadField label="Image desktop" value={desktopImage} onChange={setDesktopImage} />
      <ImageUploadField label="Image mobile" value={mobileImage} onChange={setMobileImage} />
      <label className="inline-flex items-center gap-2"><input name="isActive" type="checkbox" defaultChecked={initialData ? initialData.isActive : true} /> Active</label>
      <button className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">Enregistrer</button>
    </form>
  );
}
