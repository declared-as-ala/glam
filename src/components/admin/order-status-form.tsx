"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { updateOrderStatusAction } from "@/lib/actions";

export function OrderStatusForm({
  orderId,
  status,
  paymentStatus,
}: {
  orderId: string;
  status: string;
  paymentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      <select
        defaultValue={status}
        className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
        onChange={(event) =>
          startTransition(async () => {
            try {
              await updateOrderStatusAction({
                orderId,
                status: event.target.value as any,
                paymentStatus,
              });
              toast.success("Statut mis a jour.");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Erreur statut.");
            }
          })
        }
      >
        {["pending", "confirmed", "paid", "preparing", "shipped", "delivered", "cancelled"].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <select
        defaultValue={paymentStatus}
        className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
        onChange={(event) =>
          startTransition(async () => {
            try {
              await updateOrderStatusAction({
                orderId,
                status: status as any,
                paymentStatus: event.target.value as any,
              });
              toast.success("Paiement mis a jour.");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Erreur paiement.");
            }
          })
        }
      >
        {["unpaid", "paid", "refunded"].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {isPending ? <span className="text-xs text-gray-400">Mise a jour...</span> : null}
    </div>
  );
}
