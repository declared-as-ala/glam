import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe doivent correspondre.",
  });

export const productImageSchema = z.object({
  url: z.url(),
  alt: z.string().optional(),
  isPrimary: z.boolean().optional(),
  position: z.number().int().nonnegative(),
});

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  ingredients: z.string().optional(),
  usageInfo: z.string().optional(),
  sku: z.string().min(2),
  brand: z.string().min(1),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  images: z.array(productImageSchema).default([]),
  stockQuantity: z.coerce.number().int().nonnegative(),
  regularPrice: z.coerce.number().nonnegative(),
  promoPrice: z.coerce.number().nonnegative().optional(),
  promotionLabel: z.string().optional(),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  isBestseller: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isActive: z.boolean().default(true),
  isVisible: z.boolean().default(true),
  flashSale: z
    .object({
      isActive: z.boolean().default(false),
      startAt: z.string().optional(),
      endAt: z.string().optional(),
    })
    .default({ isActive: false }),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  icon: z.string().optional(),
  bannerImage: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  order: z.coerce.number().int().nonnegative().default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  parentCategory: z.string().optional(),
});

export const brandSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  shortText: z.string().optional(),
  logo: z.string().optional(),
  bannerImage: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export const heroSlideSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  subtitle: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  desktopImage: z.string().min(3),
  mobileImage: z.string().optional(),
  order: z.coerce.number().int().nonnegative().default(0),
  isActive: z.boolean().default(true),
});

export const homepageSectionSchema = z.object({
  id: z.string().optional(),
  key: z.string().min(2),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  isVisible: z.boolean().default(true),
  position: z.coerce.number().int().nonnegative().default(0),
  productIds: z.array(z.string()).default([]),
  brandIds: z.array(z.string()).default([]),
  categoryIds: z.array(z.string()).default([]),
  banners: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        link: z.string().optional(),
        accentColor: z.string().optional(),
      }),
    )
    .default([]),
});

export const orderCheckoutSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(6),
  line1: z.string().min(4),
  line2: z.string().optional(),
  city: z.string().min(2),
  postalCode: z.string().optional(),
  country: z.string().default("Tunisie"),
  notes: z.string().optional(),
  couponCode: z.string().optional(),
});

export const reviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().min(10),
});

export const couponSchema = z.object({
  id: z.string().optional(),
  code: z.string().min(3),
  title: z.string().min(2),
  description: z.string().optional(),
  type: z.enum(["percent", "amount"]),
  value: z.coerce.number().positive(),
  minOrderAmount: z.coerce.number().nonnegative().default(0),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  usageLimit: z.coerce.number().int().positive().optional(),
  isActive: z.boolean().default(true),
});

export const orderStatusSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum([
    "pending",
    "confirmed",
    "paid",
    "preparing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  paymentStatus: z.enum(["unpaid", "paid", "refunded"]),
});

export const marketingCampaignSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  subject: z.string().min(2),
  content: z.string().min(10),
  audience: z.enum(["all-users", "newsletter", "customers"]),
});

export const siteSettingsSchema = z.object({
  announcementBarText: z.string().optional(),
  whatsappLabel: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  newsletterTitle: z.string().optional(),
  newsletterDescription: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.email(),
  name: z.string().optional(),
});
