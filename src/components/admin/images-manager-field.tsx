"use client";

import Image from "next/image";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { useState } from "react";

import { ImageUploadField } from "@/components/admin/image-upload-field";

type ManagedImage = {
  url: string;
  alt?: string;
  isPrimary?: boolean;
  position: number;
};

export function ImagesManagerField({
  value,
  onChange,
}: {
  value: ManagedImage[];
  onChange: (value: ManagedImage[]) => void;
}) {
  const [draftUrl, setDraftUrl] = useState("");

  function normalize(next: ManagedImage[]) {
    return next.map((image, index) => ({
      ...image,
      position: index,
      isPrimary: index === 0 ? true : image.isPrimary,
    }));
  }

  return (
    <div className="space-y-4 rounded-[1.5rem] border border-gray-100 p-5">
      <ImageUploadField label="Ajouter une image" value={draftUrl} onChange={setDraftUrl} />
      <button
        type="button"
        className="rounded-full bg-[#3AB7A5] px-4 py-2 text-sm font-semibold text-white"
        onClick={() => {
          if (!draftUrl) return;
          onChange(
            normalize([
              ...value,
              { url: draftUrl, position: value.length, isPrimary: value.length === 0 },
            ]),
          );
          setDraftUrl("");
        }}
      >
        Ajouter a la galerie
      </button>

      <div className="grid gap-4 md:grid-cols-2">
        {value.map((image, index) => (
          <div key={`${image.url}-${index}`} className="rounded-2xl border border-gray-100 p-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
              <Image src={image.url} alt={image.alt || "Image produit"} fill className="object-cover" sizes="25vw" />
            </div>
            <input
              value={image.alt ?? ""}
              onChange={(event) =>
                onChange(
                  value.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, alt: event.target.value } : entry,
                  ),
                )
              }
              className="mt-3 h-10 w-full rounded-xl border border-gray-200 px-3"
              placeholder="Texte alternatif"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold"
                onClick={() =>
                  onChange(
                    normalize([
                      ...value.slice(0, index),
                      ...value.slice(index + 1),
                    ]),
                  )
                }
              >
                <Trash2 className="mr-1 inline h-3 w-3" />
                Supprimer
              </button>
              <button
                type="button"
                className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold"
                onClick={() => {
                  if (index === 0) return;
                  const clone = [...value];
                  [clone[index - 1], clone[index]] = [clone[index], clone[index - 1]];
                  onChange(normalize(clone));
                }}
              >
                <ArrowUp className="mr-1 inline h-3 w-3" />
                Monter
              </button>
              <button
                type="button"
                className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold"
                onClick={() => {
                  if (index === value.length - 1) return;
                  const clone = [...value];
                  [clone[index + 1], clone[index]] = [clone[index], clone[index + 1]];
                  onChange(normalize(clone));
                }}
              >
                <ArrowDown className="mr-1 inline h-3 w-3" />
                Descendre
              </button>
              <button
                type="button"
                className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold"
                onClick={() =>
                  onChange(
                    normalize(
                      value.map((entry, entryIndex) => ({
                        ...entry,
                        isPrimary: entryIndex === index,
                      })),
                    ),
                  )
                }
              >
                {index === 0 ? "Image principale" : "Mettre en couverture"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
