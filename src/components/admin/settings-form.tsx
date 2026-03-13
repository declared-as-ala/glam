"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateSiteSettingsAction } from "@/lib/actions";

export function SettingsForm({ initialData }: { initialData?: Record<string, any> | null }) {
  const router = useRouter();

  async function action(formData: FormData) {
    try {
      await updateSiteSettingsAction({
        announcementBarText: formData.get("announcementBarText"),
        whatsappLabel: formData.get("whatsappLabel"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        address: formData.get("address"),
        newsletterTitle: formData.get("newsletterTitle"),
        newsletterDescription: formData.get("newsletterDescription"),
      });
      toast.success("Parametres enregistres.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur parametres.");
    }
  }

  return (
    <form action={action} className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <input name="announcementBarText" defaultValue={initialData?.announcementBarText} placeholder="Texte bandeau haut" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <div className="grid gap-4 md:grid-cols-2">
        <input name="whatsappLabel" defaultValue={initialData?.whatsappLabel} placeholder="Label WhatsApp" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="phone" defaultValue={initialData?.phone} placeholder="Telephone" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="email" defaultValue={initialData?.email} placeholder="Email" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="address" defaultValue={initialData?.address} placeholder="Adresse" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <input name="newsletterTitle" defaultValue={initialData?.newsletterTitle} placeholder="Titre newsletter" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <textarea name="newsletterDescription" defaultValue={initialData?.newsletterDescription} placeholder="Description newsletter" className="min-h-28 w-full rounded-xl border border-gray-200 p-4" />
      <button className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">Enregistrer</button>
    </form>
  );
}
