"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import {
  brandSchema,
  categorySchema,
  couponSchema,
  heroSlideSchema,
  homepageSectionSchema,
  marketingCampaignSchema,
  newsletterSchema,
  orderCheckoutSchema,
  orderStatusSchema,
  productSchema,
  registerSchema,
  reviewSchema,
  siteSettingsSchema,
} from "@/lib/validators";
import { BrandModel } from "@/models/brand";
import { CartModel } from "@/models/cart";
import { CategoryModel } from "@/models/category";
import { CouponModel } from "@/models/coupon";
import { HeroSlideModel } from "@/models/hero-slide";
import { HomepageSectionConfigModel } from "@/models/homepage-section-config";
import { MarketingCampaignModel } from "@/models/marketing-campaign";
import { NewsletterSubscriberModel } from "@/models/newsletter-subscriber";
import { OrderModel } from "@/models/order";
import { ProductModel } from "@/models/product";
import { ReviewModel } from "@/models/review";
import { SiteSettingsModel } from "@/models/site-settings";
import { UserModel } from "@/models/user";
import { WishlistModel } from "@/models/wishlist";

function ensureAdmin(session: any) {
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Acces refuse.");
  }
}

async function refreshProductReviewStats(productId: string) {
  const reviews = await ReviewModel.find({
    product: productId,
    status: "approved",
  }).lean();

  const reviewCount = reviews.length;
  const ratingAverage = reviewCount
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
    : 0;

  await ProductModel.findByIdAndUpdate(productId, {
    reviewCount,
    ratingAverage: Number(ratingAverage.toFixed(1)),
  });
}

async function computeCouponDiscount(couponCode: string | undefined, subtotal: number) {
  if (!couponCode) return { discountTotal: 0, coupon: null };
  const coupon = (await CouponModel.findOne({
    code: couponCode.toUpperCase(),
    isActive: true,
  }).lean()) as any;
  if (!coupon) return { discountTotal: 0, coupon: null };

  const now = Date.now();
  if (coupon.startsAt && new Date(coupon.startsAt).getTime() > now) {
    return { discountTotal: 0, coupon: null };
  }
  if (coupon.endsAt && new Date(coupon.endsAt).getTime() < now) {
    return { discountTotal: 0, coupon: null };
  }
  if (subtotal < (coupon.minOrderAmount ?? 0)) {
    return { discountTotal: 0, coupon: null };
  }
  const discountTotal =
    coupon.type === "percent"
      ? Number(((subtotal * coupon.value) / 100).toFixed(2))
      : Math.min(coupon.value, subtotal);
  return { discountTotal, coupon };
}

export async function registerAction(input: unknown) {
  const data = registerSchema.parse(input);
  await connectToDatabase();

  const existingUser = (await UserModel.findOne({
    email: data.email.toLowerCase(),
  }).lean()) as any;
  if (existingUser) {
    throw new Error("Un compte existe deja avec cet email.");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  await UserModel.create({
    name: data.name,
    email: data.email.toLowerCase(),
    passwordHash,
    role: "customer",
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function subscribeToNewsletterAction(input: unknown) {
  const data = newsletterSchema.parse(input);
  await connectToDatabase();

  await NewsletterSubscriberModel.findOneAndUpdate(
    { email: data.email.toLowerCase() },
    {
      email: data.email.toLowerCase(),
      name: data.name,
      isActive: true,
    },
    { upsert: true, new: true },
  );

  revalidatePath("/");
  return { success: true };
}

export async function submitReviewAction(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Veuillez vous connecter pour laisser un avis.");

  const data = reviewSchema.parse(input);
  await connectToDatabase();

  await ReviewModel.create({
    product: data.productId,
    user: session.user.id,
    rating: data.rating,
    title: data.title,
    content: data.content,
    status: "pending",
  });

  revalidatePath(`/product/${data.productId}`);
  revalidatePath("/admin/reviews");
  return { success: true };
}

export async function createOrderAction(input: unknown) {
  const session = await auth();
  if (!session?.user) throw new Error("Connexion requise pour commander.");

  const data = orderCheckoutSchema.extend({
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      }),
    ),
  }).parse(input) as any;

  await connectToDatabase();

  const products = (await ProductModel.find({
    _id: { $in: data.items.map((item: any) => item.productId) },
    isActive: true,
    isVisible: true,
  })
    .populate("brand", "name")
    .lean()) as any[];

  const productMap = new Map<string, any>(
    products.map((product: any) => [String((product as any)._id), product]),
  );

  const items = data.items.map((item: { productId: string; quantity: number }) => {
    const product = productMap.get(item.productId);
    if (!product) throw new Error("Un produit du panier est indisponible.");
    if (product.stockQuantity < item.quantity) {
      throw new Error(`Stock insuffisant pour ${product.name}.`);
    }

    const unitPrice = product.promoPrice ?? product.regularPrice;
    return {
      product: product._id,
      productName: product.name,
      productSlug: product.slug,
      image:
        product.images?.find((image: { isPrimary?: boolean }) => image.isPrimary)?.url ??
        product.images?.[0]?.url,
      unitPrice,
      quantity: item.quantity,
      lineTotal: Number((unitPrice * item.quantity).toFixed(2)),
    };
  });

  const subtotal = Number(
    items.reduce((sum: number, item: any) => sum + item.lineTotal, 0).toFixed(2),
  );
  const shippingFee = subtotal >= 200 ? 0 : 7.9;
  const { discountTotal, coupon } = await computeCouponDiscount(data.couponCode, subtotal);
  const total = Number((subtotal + shippingFee - discountTotal).toFixed(2));

  const order = await OrderModel.create({
    user: session.user.id,
    items,
    subtotal,
    shippingFee,
    discountTotal,
    total,
    couponCode: coupon?.code,
    status: "pending",
    paymentStatus: "unpaid",
    shippingAddress: {
      fullName: data.fullName,
      phone: data.phone,
      line1: data.line1,
      line2: data.line2,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
    },
    notes: data.notes,
  });

  for (const item of items) {
    await ProductModel.findByIdAndUpdate(item.product, {
      $inc: { stockQuantity: -item.quantity },
    });
  }

  if (coupon) {
    await CouponModel.findByIdAndUpdate(coupon._id, { $inc: { usageCount: 1 } });
  }

  await UserModel.findByIdAndUpdate(session.user.id, {
    $inc: { totalOrders: 1, totalSpent: total },
  });

  await CartModel.findOneAndUpdate(
    { user: session.user.id },
    {
      $set: { items: [] },
    },
  );

  await sendEmail({
    to: session.user.email ?? "",
    subject: "Votre commande GLAM Parapharmacie",
    html: `<p>Merci pour votre commande. Numero: <strong>${order._id}</strong></p><p>Total: ${total.toFixed(
      2,
    )} TND</p>`,
  });

  revalidatePath("/checkout");
  revalidatePath("/cart");
  revalidatePath("/account/orders");
  revalidatePath("/admin/orders");
  return { success: true, orderId: order._id.toString() };
}

export async function upsertProductAction(input: unknown) {
  const session = await auth();
  ensureAdmin(session);
  const data = productSchema.parse(input);
  await connectToDatabase();

  const payload = {
    name: data.name,
    slug: data.slug,
    shortDescription: data.shortDescription,
    fullDescription: data.fullDescription,
    ingredients: data.ingredients,
    usageInfo: data.usageInfo,
    sku: data.sku,
    brand: data.brand,
    category: data.category,
    subcategory: data.subcategory || null,
    images: data.images,
    stockQuantity: data.stockQuantity,
    regularPrice: data.regularPrice,
    promoPrice: data.promoPrice,
    promotionLabel: data.promotionLabel,
    tags: data.tags,
    isFeatured: data.isFeatured,
    isBestseller: data.isBestseller,
    isNew: data.isNew,
    isActive: data.isActive,
    isVisible: data.isVisible,
    flashSale: {
      isActive: data.flashSale.isActive,
      startAt: data.flashSale.startAt ? new Date(data.flashSale.startAt) : null,
      endAt: data.flashSale.endAt ? new Date(data.flashSale.endAt) : null,
    },
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
  };

  if (data.id) {
    await ProductModel.findByIdAndUpdate(data.id, payload);
  } else {
    await ProductModel.create(payload);
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function deleteProductAction(id: string) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();
  await ProductModel.findByIdAndDelete(id);
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function upsertCategoryAction(input: unknown) {
  const session = await auth();
  ensureAdmin(session);
  const data = categorySchema.parse(input);
  await connectToDatabase();

  const payload = {
    name: data.name,
    slug: data.slug,
    description: data.description,
    icon: data.icon,
    bannerImage: data.bannerImage,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    order: data.order,
    isActive: data.isActive,
    isFeatured: data.isFeatured,
    parentCategory: data.parentCategory || null,
  };

  if (data.id) {
    await CategoryModel.findByIdAndUpdate(data.id, payload);
  } else {
    await CategoryModel.create(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/categories");
  return { success: true };
}

export async function deleteCategoryAction(id: string) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();
  await CategoryModel.findByIdAndDelete(id);
  revalidatePath("/admin/categories");
}

export async function upsertBrandAction(input: unknown) {
  const session = await auth();
  ensureAdmin(session);
  const data = brandSchema.parse(input);
  await connectToDatabase();

  const payload = {
    name: data.name,
    slug: data.slug,
    shortText: data.shortText,
    logo: data.logo,
    bannerImage: data.bannerImage,
    isActive: data.isActive,
    isFeatured: data.isFeatured,
  };

  if (data.id) {
    await BrandModel.findByIdAndUpdate(data.id, payload);
  } else {
    await BrandModel.create(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/brands");
  return { success: true };
}

export async function deleteBrandAction(id: string) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();
  await BrandModel.findByIdAndDelete(id);
  revalidatePath("/admin/brands");
}

export async function upsertHeroSlideAction(input: unknown) {
  const session = await auth();
  ensureAdmin(session);
  const data = heroSlideSchema.parse(input);
  await connectToDatabase();

  const payload = {
    title: data.title,
    subtitle: data.subtitle,
    ctaText: data.ctaText,
    ctaLink: data.ctaLink,
    desktopImage: data.desktopImage,
    mobileImage: data.mobileImage,
    order: data.order,
    isActive: data.isActive,
  };

  if (data.id) {
    await HeroSlideModel.findByIdAndUpdate(data.id, payload);
  } else {
    await HeroSlideModel.create(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
  return { success: true };
}

export async function deleteHeroSlideAction(id: string) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();
  await HeroSlideModel.findByIdAndDelete(id);
  revalidatePath("/admin/hero-slides");
  revalidatePath("/");
}

export async function upsertHomepageSectionAction(input: unknown) {
  const session = await auth();
  ensureAdmin(session);
  const data = homepageSectionSchema.parse(input);
  await connectToDatabase();

  const payload = {
    key: data.key,
    title: data.title,
    subtitle: data.subtitle,
    isVisible: data.isVisible,
    position: data.position,
    productIds: data.productIds,
    brandIds: data.brandIds,
    categoryIds: data.categoryIds,
    banners: data.banners,
  };

  if (data.id) {
    await HomepageSectionConfigModel.findByIdAndUpdate(data.id, payload);
  } else {
    await HomepageSectionConfigModel.create(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/homepage-sections");
  return { success: true };
}

export async function deleteHomepageSectionAction(id: string) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();
  await HomepageSectionConfigModel.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin/homepage-sections");
}

export async function updateOrderStatusAction(input: unknown) {
  const session = await auth();
  ensureAdmin(session);
  const data = orderStatusSchema.parse(input);
  await connectToDatabase();

  await OrderModel.findByIdAndUpdate(data.orderId, {
    status: data.status,
    paymentStatus: data.paymentStatus,
  });

  revalidatePath("/admin/orders");
  revalidatePath("/account/orders");
  return { success: true };
}

export async function upsertCouponAction(input: unknown) {
  const session = await auth();
  ensureAdmin(session);
  const data = couponSchema.parse(input);
  await connectToDatabase();

  const payload = {
    code: data.code.toUpperCase(),
    title: data.title,
    description: data.description,
    type: data.type,
    value: data.value,
    minOrderAmount: data.minOrderAmount,
    startsAt: data.startsAt ? new Date(data.startsAt) : null,
    endsAt: data.endsAt ? new Date(data.endsAt) : null,
    usageLimit: data.usageLimit,
    isActive: data.isActive,
  };

  if (data.id) {
    await CouponModel.findByIdAndUpdate(data.id, payload);
  } else {
    await CouponModel.create(payload);
  }

  revalidatePath("/admin/coupons");
  return { success: true };
}

export async function deleteCouponAction(id: string) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();
  await CouponModel.findByIdAndDelete(id);
  revalidatePath("/admin/coupons");
}

export async function moderateReviewAction(input: {
  reviewId: string;
  status: "approved" | "rejected" | "hidden";
}) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();

  const review = await ReviewModel.findByIdAndUpdate(
    input.reviewId,
    { status: input.status },
    { new: true },
  );
  if (review) {
    await refreshProductReviewStats(review.product.toString());
  }
  revalidatePath("/admin/reviews");
}

export async function deleteReviewAction(reviewId: string) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();

  const review = await ReviewModel.findById(reviewId);
  if (review) {
    const productId = review.product.toString();
    await review.deleteOne();
    await refreshProductReviewStats(productId);
  }
  revalidatePath("/admin/reviews");
}

export async function toggleUserBlockedAction(userId: string) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();

  const user = await UserModel.findById(userId);
  if (!user) throw new Error("Utilisateur introuvable.");
  user.isBlocked = !user.isBlocked;
  await user.save();
  revalidatePath("/admin/users");
}

export async function upsertMarketingCampaignAction(input: unknown) {
  const session = await auth();
  ensureAdmin(session);
  const data = marketingCampaignSchema.parse(input);
  await connectToDatabase();

  if (data.id) {
    await MarketingCampaignModel.findByIdAndUpdate(data.id, data);
  } else {
    await MarketingCampaignModel.create(data);
  }

  revalidatePath("/admin/marketing");
  return { success: true };
}

export async function sendMarketingCampaignAction(campaignId: string, testEmail?: string) {
  const session = await auth();
  ensureAdmin(session);
  await connectToDatabase();

  const campaign = await MarketingCampaignModel.findById(campaignId);
  if (!campaign) throw new Error("Campagne introuvable.");

  let recipients: string[] = [];
  if (testEmail) {
    recipients = [testEmail];
  } else if (campaign.audience === "all-users" || campaign.audience === "customers") {
    recipients = (await UserModel.find({ role: "customer", isBlocked: false }).select("email").lean()).map(
      (user) => user.email,
    );
  } else {
    recipients = (
      await NewsletterSubscriberModel.find({ isActive: true }).select("email").lean()
    ).map((subscriber) => subscriber.email);
  }

  if (recipients.length > 0) {
    await sendEmail({
      to: recipients,
      subject: campaign.subject,
      html: `<div><h1>${campaign.title}</h1><p>${campaign.content}</p><p><a href="https://glam-parapharmacie.tn">Visiter la boutique</a></p></div>`,
    });
  }

  if (!testEmail) {
    campaign.status = "sent";
    campaign.sentAt = new Date();
    campaign.recipientsCount = recipients.length;
    await campaign.save();
    revalidatePath("/admin/marketing");
  }

  return { success: true, recipients: recipients.length };
}

export async function updateSiteSettingsAction(input: unknown) {
  const session = await auth();
  ensureAdmin(session);
  const data = siteSettingsSchema.parse(input);
  await connectToDatabase();

  await SiteSettingsModel.findOneAndUpdate({}, data, {
    new: true,
    upsert: true,
  });

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function addToWishlistAction(productId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Connexion requise.");
  await connectToDatabase();

  await WishlistModel.findOneAndUpdate(
    { user: session.user.id },
    { $addToSet: { products: productId } },
    { upsert: true },
  );

  revalidatePath("/wishlist");
}

export async function removeFromWishlistAction(productId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Connexion requise.");
  await connectToDatabase();

  await WishlistModel.findOneAndUpdate(
    { user: session.user.id },
    { $pull: { products: productId } },
  );

  revalidatePath("/wishlist");
}
