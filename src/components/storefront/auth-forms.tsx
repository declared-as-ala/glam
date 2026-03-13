"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { registerAction } from "@/lib/actions";

export function LoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function action(formData: FormData) {
    setIsPending(true);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    setIsPending(false);

    if (result?.error) {
      toast.error("Email ou mot de passe invalide.");
      return;
    }

    toast.success("Connexion reussie.");
    router.push("/account");
    router.refresh();
  }

  return (
    <form action={action} className="space-y-4 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <input name="email" type="email" required placeholder="Email" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <input name="password" type="password" required placeholder="Mot de passe" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <button disabled={isPending} className="w-full rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">
        Se connecter
      </button>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function action(formData: FormData) {
    setIsPending(true);
    try {
      await registerAction({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
      });
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      toast.success("Compte cree avec succes.");
      router.push("/account");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur inscription.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form action={action} className="space-y-4 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <input name="name" required placeholder="Nom complet" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <input name="email" type="email" required placeholder="Email" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <input name="password" type="password" required placeholder="Mot de passe" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <input name="confirmPassword" type="password" required placeholder="Confirmer le mot de passe" className="h-12 w-full rounded-xl border border-gray-200 px-4" />
      <button disabled={isPending} className="w-full rounded-full bg-[#3AB7A5] px-6 py-4 font-semibold text-white">
        Creer mon compte
      </button>
    </form>
  );
}
