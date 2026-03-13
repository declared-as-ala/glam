"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { upsertCouponAction } from "@/lib/actions";

export function CouponForm({ initialData }: { initialData?: Record<string, any> | null }) {
  const router = useRouter();

  async function action(formData: FormData) {
    try {
      await upsertCouponAction({
        id: initialData?._id,
        code: formData.get("code"),
        title: formData.get("title"),
        description: formData.get("description"),
        type: formData.get("type"),
        value: Number(formData.get("value")),
        minOrderAmount: Number(formData.get("minOrderAmount")),
        startsAt: formData.get("startsAt"),
        endsAt: formData.get("endsAt"),
        usageLimit: formData.get("usageLimit")
          ? Number(formData.get("usageLimit"))
          : undefined,
        isActive: formData.get("isActive") === "on",
      });
      toast.success("Coupon enregistre.");
      router.push("/admin/coupons");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur coupon.");
    }
  }

  return (
    <form action={action} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="code" defaultValue={initialData?.code} placeholder="Code" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="title" defaultValue={initialData?.title} placeholder="Titre" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <textarea name="description" defaultValue={initialData?.description} placeholder="Description" className="min-h-24 w-full rounded-xl border border-gray-200 p-4" />
      <div className="grid gap-4 md:grid-cols-4">
        <select name="type" defaultValue={initialData?.type ?? "percent"} className="h-12 rounded-xl border border-gray-200 px-4">
          <option value="percent">Pourcentage</option>
          <option value="amount">Montant</option>
        </select>
        <input name="value" defaultValue={initialData?.value} placeholder="Valeur" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="minOrderAmount" defaultValue={initialData?.minOrderAmount ?? 0} placeholder="Minimum panier" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="usageLimit" defaultValue={initialData?.usageLimit} placeholder="Limite d'usage" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="startsAt" type="datetime-local" defaultValue={initialData?.startsAt?.slice?.(0, 16)} className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="endsAt" type="datetime-local" defaultValue={initialData?.endsAt?.slice?.(0, 16)} className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <label className="inline-flex items-center gap-2"><input name="isActive" type="checkbox" defaultChecked={initialData ? initialData.isActive : true} /> Actif</label>
      <button className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">Enregistrer</button>
    </form>
  );
}
