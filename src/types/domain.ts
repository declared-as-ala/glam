import type { Types } from "mongoose";

export type Role = "admin" | "customer";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type ReviewStatus = "pending" | "approved" | "rejected" | "hidden";

export interface ProductImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
  position: number;
}

export interface SeoFields {
  title?: string;
  description?: string;
}

export interface FlashSaleFields {
  isActive: boolean;
  startAt?: Date | null;
  endAt?: Date | null;
}

export interface ProductSummary {
  _id: string;
  name: string;
  slug: string;
  brandName?: string;
  categoryName?: string;
  price: number;
  promoPrice?: number;
  primaryImage?: string;
  ratingAverage: number;
  reviewCount: number;
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  isFlashSale: boolean;
  stockQuantity: number;
}

export interface StoreSearchFilters {
  q?: string;
  category?: string;
  brand?: string;
  sort?: string;
  promo?: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string | null;
}

export interface MongoDocument {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
