"use client";

import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { subscribeToNewsletterAction } from "@/lib/actions";

export function NewsletterBlock({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      await subscribeToNewsletterAction({
        email: formData.get("email"),
      });
      setEmail("");
      toast.success("Inscription enregistree.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="rounded-[2rem] bg-gradient-to-r from-[#3AB7A5] to-[#2d9687] p-10 text-center text-white">
      <Mail className="mx-auto mb-4 h-12 w-12" />
      <h2 className="text-3xl font-bold">{title ?? "Recevez nos offres exclusives"}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-white/85">
        {description ??
          "Inscrivez-vous a notre newsletter et beneficiez des nouveautes, ventes flash et conseils beaute."}
      </p>
      <form action={handleSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
        <input
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="Votre adresse email"
          className="h-14 flex-1 rounded-full border-0 px-6 text-gray-900"
        />
        <button
          disabled={isPending}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-semibold text-[#3AB7A5]"
        >
          S'inscrire <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
