"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { toggleUserBlockedAction } from "@/lib/actions";

export function UserBlockButton({
  userId,
  isBlocked,
}: {
  userId: string;
  isBlocked: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          try {
            await toggleUserBlockedAction(userId);
            toast.success("Utilisateur mis a jour.");
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erreur utilisateur.");
          }
        })
      }
      className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold"
    >
      {isPending ? "..." : isBlocked ? "Debloquer" : "Bloquer"}
    </button>
  );
}
