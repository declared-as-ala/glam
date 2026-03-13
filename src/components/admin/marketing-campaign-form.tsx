"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { sendMarketingCampaignAction, upsertMarketingCampaignAction } from "@/lib/actions";

export function MarketingCampaignForm({
  initialData,
}: {
  initialData?: Record<string, any> | null;
}) {
  const router = useRouter();

  async function saveAction(formData: FormData) {
    try {
      await upsertMarketingCampaignAction({
        id: initialData?._id,
        title: formData.get("title"),
        subject: formData.get("subject"),
        content: formData.get("content"),
        audience: formData.get("audience"),
      });
      toast.success("Campagne enregistree.");
      router.push("/admin/marketing");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur campagne.");
    }
  }

  async function sendTest() {
    if (!initialData?._id) {
      toast.error("Enregistrez d'abord la campagne.");
      return;
    }
    const email = window.prompt("Adresse email de test");
    if (!email) return;
    try {
      await sendMarketingCampaignAction(initialData._id, email);
      toast.success("Email de test envoye.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur envoi test.");
    }
  }

  return (
    <form action={saveAction} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <input name="title" defaultValue={initialData?.title} placeholder="Titre interne" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <input name="subject" defaultValue={initialData?.subject} placeholder="Sujet email" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <select name="audience" defaultValue={initialData?.audience ?? "newsletter"} className="h-12 w-full rounded-xl border border-gray-200 px-4">
        <option value="newsletter">Newsletter</option>
        <option value="customers">Clients</option>
        <option value="all-users">Tous les utilisateurs</option>
      </select>
      <textarea name="content" defaultValue={initialData?.content} placeholder="Contenu email" className="min-h-56 w-full rounded-xl border border-gray-200 p-4" />
      <div className="flex gap-3">
        <button className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">Enregistrer</button>
        {initialData?._id ? (
          <button type="button" onClick={() => void sendTest()} className="rounded-full border border-gray-200 px-6 py-4 font-semibold text-gray-700">
            Envoyer un test
          </button>
        ) : null}
      </div>
    </form>
  );
}
