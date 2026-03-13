"use client";

import { useState } from "react";
import { toast } from "sonner";

import { submitReviewAction } from "@/lib/actions";

export function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setIsPending(true);
    try {
      await submitReviewAction({
        productId,
        rating,
        title: formData.get("title"),
        content: formData.get("content"),
      });
      setTitle("");
      setContent("");
      setRating(5);
      toast.success("Merci. Votre avis sera verifie avant publication.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur avis.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form action={onSubmit} className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">Laisser un avis</h3>
      <div className="mt-4 flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className={`rounded-full px-4 py-2 text-sm ${
              rating >= value ? "bg-[#3AB7A5] text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {value}★
          </button>
        ))}
      </div>
      <input
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="mt-4 h-12 w-full rounded-xl border border-gray-200 px-4"
        placeholder="Titre de votre avis"
      />
      <textarea
        name="content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="mt-4 min-h-32 w-full rounded-xl border border-gray-200 p-4"
        placeholder="Partagez votre experience"
      />
      <button
        disabled={isPending}
        className="mt-4 rounded-full bg-[#3AB7A5] px-6 py-3 font-semibold text-white"
      >
        Envoyer mon avis
      </button>
    </form>
  );
}
