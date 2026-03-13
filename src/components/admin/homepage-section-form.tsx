"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ImageUploadField } from "@/components/admin/image-upload-field";
import { upsertHomepageSectionAction } from "@/lib/actions";

type BannerItem = {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
  accentColor?: string;
};

export function HomepageSectionForm({
  initialData,
  selectableProducts,
  selectableBrands,
  selectableCategories,
}: {
  initialData?: Record<string, any> | null;
  selectableProducts: Array<any>;
  selectableBrands: Array<any>;
  selectableCategories: Array<any>;
}) {
  const router = useRouter();
  const [banners, setBanners] = useState<BannerItem[]>(initialData?.banners ?? []);

  async function action(formData: FormData) {
    try {
      await upsertHomepageSectionAction({
        id: initialData?._id,
        key: formData.get("key"),
        title: formData.get("title"),
        subtitle: formData.get("subtitle"),
        isVisible: formData.get("isVisible") === "on",
        position: Number(formData.get("position")),
        productIds: formData.getAll("productIds"),
        brandIds: formData.getAll("brandIds"),
        categoryIds: formData.getAll("categoryIds"),
        banners,
      });
      toast.success("Section enregistree.");
      router.push("/admin/homepage-sections");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur section.");
    }
  }

  return (
    <form action={action} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <div className="grid gap-4 md:grid-cols-3">
        <input name="key" defaultValue={initialData?.key} placeholder="Cle section" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="title" defaultValue={initialData?.title} placeholder="Titre" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="position" defaultValue={initialData?.position ?? 0} placeholder="Position" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <textarea name="subtitle" defaultValue={initialData?.subtitle} placeholder="Sous-titre" className="min-h-24 w-full rounded-xl border border-gray-200 p-4" />
      <div className="grid gap-4 lg:grid-cols-3">
        <select multiple name="productIds" defaultValue={initialData?.productIds ?? []} className="min-h-48 rounded-xl border border-gray-200 p-4">
          {selectableProducts.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <select multiple name="brandIds" defaultValue={initialData?.brandIds ?? []} className="min-h-48 rounded-xl border border-gray-200 p-4">
          {selectableBrands.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <select multiple name="categoryIds" defaultValue={initialData?.categoryIds ?? []} className="min-h-48 rounded-xl border border-gray-200 p-4">
          {selectableCategories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <label className="inline-flex items-center gap-2"><input name="isVisible" type="checkbox" defaultChecked={initialData ? initialData.isVisible : true} /> Visible</label>

      <div className="space-y-4 rounded-[1.5rem] border border-gray-100 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Bannieres / univers</h3>
          <button
            type="button"
            onClick={() => setBanners([...banners, {}])}
            className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold"
          >
            Ajouter une banniere
          </button>
        </div>
        {banners.map((banner, index) => (
          <div key={index} className="space-y-3 rounded-2xl border border-gray-100 p-4">
            <input value={banner.title ?? ""} onChange={(event) => setBanners(banners.map((entry, entryIndex) => entryIndex === index ? { ...entry, title: event.target.value } : entry))} placeholder="Titre" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
            <textarea value={banner.description ?? ""} onChange={(event) => setBanners(banners.map((entry, entryIndex) => entryIndex === index ? { ...entry, description: event.target.value } : entry))} placeholder="Description" className="min-h-24 w-full rounded-xl border border-gray-200 p-4" />
            <div className="grid gap-4 md:grid-cols-2">
              <ImageUploadField label="Image" value={banner.image} onChange={(value) => setBanners(banners.map((entry, entryIndex) => entryIndex === index ? { ...entry, image: value } : entry))} />
              <div className="grid gap-3">
                <input value={banner.link ?? ""} onChange={(event) => setBanners(banners.map((entry, entryIndex) => entryIndex === index ? { ...entry, link: event.target.value } : entry))} placeholder="Lien" className="h-12 rounded-xl border border-gray-200 px-4" />
                <input value={banner.accentColor ?? ""} onChange={(event) => setBanners(banners.map((entry, entryIndex) => entryIndex === index ? { ...entry, accentColor: event.target.value } : entry))} placeholder="Couleur accent (#3AB7A5CC)" className="h-12 rounded-xl border border-gray-200 px-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">Enregistrer</button>
    </form>
  );
}
