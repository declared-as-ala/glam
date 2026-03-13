"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";

import { ImagesManagerField } from "@/components/admin/images-manager-field";
import { upsertProductAction } from "@/lib/actions";

type ProductFormProps = {
  initialData?: Record<string, any> | null;
  brands: Array<any>;
  categories: Array<any>;
};

export function ProductForm({
  initialData,
  brands,
  categories,
}: ProductFormProps) {
  const router = useRouter();
  const [images, setImages] = useState(initialData?.images ?? []);
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState(initialData?.name ?? "");
  const generatedSlug = useMemo(
    () => slugify(name || initialData?.slug || "", { lower: true, strict: true }),
    [initialData?.slug, name],
  );

  async function onSubmit(formData: FormData) {
    setIsPending(true);
    try {
      await upsertProductAction({
        id: initialData?._id,
        name,
        slug: formData.get("slug") || generatedSlug,
        shortDescription: formData.get("shortDescription"),
        fullDescription: formData.get("fullDescription"),
        ingredients: formData.get("ingredients"),
        usageInfo: formData.get("usageInfo"),
        sku: formData.get("sku"),
        brand: formData.get("brand"),
        category: formData.get("category"),
        subcategory: formData.get("subcategory"),
        images,
        stockQuantity: Number(formData.get("stockQuantity")),
        regularPrice: Number(formData.get("regularPrice")),
        promoPrice: formData.get("promoPrice")
          ? Number(formData.get("promoPrice"))
          : undefined,
        promotionLabel: formData.get("promotionLabel"),
        tags: String(formData.get("tags") || "")
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
        isFeatured: formData.get("isFeatured") === "on",
        isBestseller: formData.get("isBestseller") === "on",
        isNew: formData.get("isNew") === "on",
        isActive: formData.get("isActive") === "on",
        isVisible: formData.get("isVisible") === "on",
        flashSale: {
          isActive: formData.get("flashSaleActive") === "on",
          startAt: String(formData.get("flashSaleStart") || ""),
          endAt: String(formData.get("flashSaleEnd") || ""),
        },
        seoTitle: formData.get("seoTitle"),
        seoDescription: formData.get("seoDescription"),
      });
      toast.success("Produit enregistre.");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur produit.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">Nom</label>
          <input value={name} onChange={(event) => setName(event.target.value)} className="h-12 rounded-xl border border-gray-200 px-4" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <input name="slug" defaultValue={initialData?.slug ?? generatedSlug} className="h-12 rounded-xl border border-gray-200 px-4" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">SKU</label>
          <input name="sku" defaultValue={initialData?.sku} className="h-12 rounded-xl border border-gray-200 px-4" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">Marque</label>
          <select name="brand" defaultValue={initialData?.brand} className="h-12 rounded-xl border border-gray-200 px-4">
            <option value="">Choisir</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-700">Categorie</label>
          <select name="category" defaultValue={initialData?.category} className="h-12 rounded-xl border border-gray-200 px-4">
            <option value="">Choisir</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <input name="regularPrice" defaultValue={initialData?.regularPrice} placeholder="Prix regulier" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="promoPrice" defaultValue={initialData?.promoPrice} placeholder="Prix promo" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="stockQuantity" defaultValue={initialData?.stockQuantity ?? 0} placeholder="Stock" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <input name="promotionLabel" defaultValue={initialData?.promotionLabel} placeholder="Label promo" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <textarea name="shortDescription" defaultValue={initialData?.shortDescription} placeholder="Description courte" className="min-h-24 w-full rounded-xl border border-gray-200 p-4" />
      <textarea name="fullDescription" defaultValue={initialData?.fullDescription} placeholder="Description complete" className="min-h-40 w-full rounded-xl border border-gray-200 p-4" />
      <textarea name="ingredients" defaultValue={initialData?.ingredients} placeholder="Ingredients" className="min-h-24 w-full rounded-xl border border-gray-200 p-4" />
      <textarea name="usageInfo" defaultValue={initialData?.usageInfo} placeholder="Conseils d'utilisation" className="min-h-24 w-full rounded-xl border border-gray-200 p-4" />
      <input name="tags" defaultValue={initialData?.tags?.join(", ")} placeholder="Tags separes par des virgules" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <ImagesManagerField value={images} onChange={setImages} />
      <div className="grid gap-4 md:grid-cols-2">
        <input name="flashSaleStart" type="datetime-local" defaultValue={initialData?.flashSale?.startAt?.slice?.(0, 16)} className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="flashSaleEnd" type="datetime-local" defaultValue={initialData?.flashSale?.endAt?.slice?.(0, 16)} className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        {[
          ["isFeatured", "Featured"],
          ["isBestseller", "Bestseller"],
          ["isNew", "Nouveau"],
          ["isActive", "Actif"],
          ["isVisible", "Visible"],
        ].map(([name, label]) => (
          <label key={name} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm">
            <input
              name={name}
              type="checkbox"
              defaultChecked={initialData ? Boolean(initialData[name]) : name === "isActive" || name === "isVisible"}
            />
            {label}
          </label>
        ))}
      </div>
      <label className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm">
        <input name="flashSaleActive" type="checkbox" defaultChecked={Boolean(initialData?.flashSale?.isActive)} />
        Activer la vente flash
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="seoTitle" defaultValue={initialData?.seoTitle} placeholder="SEO title" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="seoDescription" defaultValue={initialData?.seoDescription} placeholder="SEO description" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <button disabled={isPending} className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">
        {isPending ? "Enregistrement..." : "Enregistrer le produit"}
      </button>
    </form>
  );
}
