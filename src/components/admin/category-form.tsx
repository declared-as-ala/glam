"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";

import { ImageUploadField } from "@/components/admin/image-upload-field";
import { upsertCategoryAction } from "@/lib/actions";

export function CategoryForm({
  initialData,
  categories,
}: {
  initialData?: Record<string, any> | null;
  categories: Array<any>;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name ?? "");
  const [bannerImage, setBannerImage] = useState(initialData?.bannerImage ?? "");

  async function action(formData: FormData) {
    try {
      await upsertCategoryAction({
        id: initialData?._id,
        name,
        slug: formData.get("slug") || slugify(name, { lower: true, strict: true }),
        description: formData.get("description"),
        icon: formData.get("icon"),
        bannerImage,
        seoTitle: formData.get("seoTitle"),
        seoDescription: formData.get("seoDescription"),
        order: Number(formData.get("order")),
        isActive: formData.get("isActive") === "on",
        isFeatured: formData.get("isFeatured") === "on",
        parentCategory: formData.get("parentCategory"),
      });
      toast.success("Categorie enregistree.");
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur categorie.");
    }
  }

  return (
    <form action={action} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <div className="grid gap-4 md:grid-cols-2">
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nom" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="slug" defaultValue={initialData?.slug} placeholder="Slug" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <textarea name="description" defaultValue={initialData?.description} placeholder="Description" className="min-h-28 w-full rounded-xl border border-gray-200 p-4" />
      <div className="grid gap-4 md:grid-cols-3">
        <input name="icon" defaultValue={initialData?.icon} placeholder="Icone (emoji)" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="order" defaultValue={initialData?.order ?? 0} placeholder="Ordre" className="h-12 rounded-xl border border-gray-200 px-4" />
        <select name="parentCategory" defaultValue={initialData?.parentCategory} className="h-12 rounded-xl border border-gray-200 px-4">
          <option value="">Categorie parente (optionnel)</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <ImageUploadField label="Banniere" value={bannerImage} onChange={setBannerImage} />
      <div className="grid gap-4 md:grid-cols-2">
        <input name="seoTitle" defaultValue={initialData?.seoTitle} placeholder="SEO title" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="seoDescription" defaultValue={initialData?.seoDescription} placeholder="SEO description" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <div className="flex gap-4">
        <label className="inline-flex items-center gap-2"><input name="isActive" type="checkbox" defaultChecked={initialData ? initialData.isActive : true} /> Active</label>
        <label className="inline-flex items-center gap-2"><input name="isFeatured" type="checkbox" defaultChecked={Boolean(initialData?.isFeatured)} /> Featured</label>
      </div>
      <button className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">Enregistrer</button>
    </form>
  );
}
