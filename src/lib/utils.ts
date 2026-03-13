import { clsx, type ClassValue } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    maximumFractionDigits: 2,
  }).format(value);
}

export function makeSlug(value: string) {
  return slugify(value, { lower: true, strict: true, trim: true });
}

export function isFlashSaleActive(
  isActive: boolean | undefined,
  startAt?: Date | null,
  endAt?: Date | null,
) {
  if (!isActive) return false;
  const now = Date.now();
  if (startAt && startAt.getTime() > now) return false;
  if (endAt && endAt.getTime() < now) return false;
  return true;
}
