"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { deleteReviewAction, moderateReviewAction } from "@/lib/actions";

export function ReviewModerationActions({
  reviewId,
}: {
  reviewId: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handle(status: "approved" | "rejected" | "hidden") {
    startTransition(async () => {
      try {
        await moderateReviewAction({ reviewId, status });
        toast.success("Avis mis a jour.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erreur moderation.");
      }
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" className="rounded-full border border-gray-200 px-3 py-2 text-xs" onClick={() => handle("approved")}>
        Approuver
      </button>
      <button type="button" className="rounded-full border border-gray-200 px-3 py-2 text-xs" onClick={() => handle("hidden")}>
        Masquer
      </button>
      <button type="button" className="rounded-full border border-gray-200 px-3 py-2 text-xs" onClick={() => handle("rejected")}>
        Rejeter
      </button>
      <button
        type="button"
        className="rounded-full border border-red-200 px-3 py-2 text-xs text-red-600"
        onClick={() =>
          startTransition(async () => {
            try {
              await deleteReviewAction(reviewId);
              toast.success("Avis supprime.");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Erreur suppression.");
            }
          })
        }
      >
        Supprimer
      </button>
      {isPending ? <span className="text-xs text-gray-400">...</span> : null}
    </div>
  );
}
