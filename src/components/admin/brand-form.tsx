"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";

import { ImageUploadField } from "@/components/admin/image-upload-field";
import { upsertBrandAction } from "@/lib/actions";

export function BrandForm({ initialData }: { initialData?: Record<string, any> | null }) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name ?? "");
  const [logo, setLogo] = useState(initialData?.logo ?? "");
  const [bannerImage, setBannerImage] = useState(initialData?.bannerImage ?? "");

  async function action(formData: FormData) {
    try {
      await upsertBrandAction({
        id: initialData?._id,
        name,
        slug: formData.get("slug") || slugify(name, { lower: true, strict: true }),
        shortText: formData.get("shortText"),
        logo,
        bannerImage,
        isActive: formData.get("isActive") === "on",
        isFeatured: formData.get("isFeatured") === "on",
      });
      toast.success("Marque enregistree.");
      router.push("/admin/brands");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur marque.");
    }
  }

  return (
    <form action={action} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <div className="grid gap-4 md:grid-cols-2">
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nom" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="slug" defaultValue={initialData?.slug} placeholder="Slug" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <textarea name="shortText" defaultValue={initialData?.shortText} placeholder="Texte court" className="min-h-28 w-full rounded-xl border border-gray-200 p-4" />
      <ImageUploadField label="Logo" value={logo} onChange={setLogo} />
      <ImageUploadField label="Banniere" value={bannerImage} onChange={setBannerImage} />
      <div className="flex gap-4">
        <label className="inline-flex items-center gap-2"><input name="isActive" type="checkbox" defaultChecked={initialData ? initialData.isActive : true} /> Active</label>
        <label className="inline-flex items-center gap-2"><input name="isFeatured" type="checkbox" defaultChecked={Boolean(initialData?.isFeatured)} /> Featured</label>
      </div>
      <button className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">Enregistrer</button>
    </form>
  );
}
