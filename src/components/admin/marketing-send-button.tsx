"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { sendMarketingCampaignAction } from "@/lib/actions";

export function MarketingSendButton({ campaignId }: { campaignId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          try {
            const result = await sendMarketingCampaignAction(campaignId);
            toast.success(`Campagne envoyee a ${result.recipients} destinataires.`);
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erreur campagne.");
          }
        })
      }
      className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold"
    >
      {isPending ? "Envoi..." : "Envoyer"}
    </button>
  );
}
