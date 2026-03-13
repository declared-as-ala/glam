"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/components/providers/cart-provider";
import { createOrderAction } from "@/lib/actions";

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [isPending, setIsPending] = useState(false);

  async function action(formData: FormData) {
    setIsPending(true);
    try {
      const result = await createOrderAction({
        fullName: formData.get("fullName"),
        phone: formData.get("phone"),
        line1: formData.get("line1"),
        line2: formData.get("line2"),
        city: formData.get("city"),
        postalCode: formData.get("postalCode"),
        country: "Tunisie",
        notes: formData.get("notes"),
        couponCode: formData.get("couponCode"),
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      });
      await clearCart();
      toast.success("Commande creee avec succes.");
      router.push(`/account/orders/${result.orderId}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur commande.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form action={action} className="grid gap-4 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="fullName" placeholder="Nom complet" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="phone" placeholder="Telephone" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <input name="line1" placeholder="Adresse" className="h-12 rounded-xl border border-gray-200 px-4" />
      <div className="grid gap-4 md:grid-cols-2">
        <input name="city" placeholder="Ville" className="h-12 rounded-xl border border-gray-200 px-4" />
        <input name="postalCode" placeholder="Code postal" className="h-12 rounded-xl border border-gray-200 px-4" />
      </div>
      <input name="couponCode" placeholder="Code promo" className="h-12 rounded-xl border border-gray-200 px-4" />
      <textarea name="notes" placeholder="Notes de livraison" className="min-h-28 rounded-xl border border-gray-200 p-4" />
      <button disabled={isPending || items.length === 0} className="rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">
        Confirmer ma commande
      </button>
    </form>
  );
}
