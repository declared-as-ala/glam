"use client";

import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type ImageUploadFieldProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

export function ImageUploadField({
  label,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFile(file: File) {
    setIsUploading(true);
    try {
      const signatureResponse = await fetch("/api/cloudinary/signature", {
        method: "POST",
      });
      const signatureData = await signatureResponse.json();
      if (!signatureResponse.ok) {
        throw new Error(signatureData.message ?? "Erreur de signature.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.apiKey);
      formData.append("timestamp", signatureData.timestamp);
      formData.append("signature", signatureData.signature);
      formData.append("folder", signatureData.folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error?.message ?? "Upload impossible.");
      }

      onChange(uploadData.secure_url);
      toast.success("Image telechargee.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur upload.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder="https://..."
        className="h-12 rounded-xl border border-gray-200 px-4"
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleFile(file);
          }
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"
      >
        <Upload className="h-4 w-4" />
        {isUploading ? "Upload en cours..." : "Uploader une image"}
      </button>
    </div>
  );
}
