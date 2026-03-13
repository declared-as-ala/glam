import { addMilliseconds, differenceInMilliseconds } from "date-fns";
import { Types } from "mongoose";
import type { SortOrder } from "mongoose";

import { blogPosts } from "@/data/blog-posts";
import { connectToDatabase } from "@/lib/db";
import { formatPrice, isFlashSaleActive } from "@/lib/utils";
import { BrandModel } from "@/models/brand";
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

function plain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function serializeProduct(product: Record<string, any>) {
  const primaryImage =
    product.images?.find((image: { isPrimary?: boolean }) => image.isPrimary)?.url ??
    product.images?.[0]?.url ??
    "";
  const isFlashSale = isFlashSaleActive(
    product.flashSale?.isActive,
    product.flashSale?.startAt ? new Date(product.flashSale.startAt) : null,
    product.flashSale?.endAt ? new Date(product.flashSale.endAt) : null,
  );

  return {
    _id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    fullDescription: product.fullDescription,
    brandName: product.brand?.name,
    brandSlug: product.brand?.slug,
    categoryName: product.category?.name,
    categorySlug: product.category?.slug,
    price: product.regularPrice,
    promoPrice: product.promoPrice,
    primaryImage,
    images: product.images ?? [],
    ratingAverage: product.ratingAverage ?? 0,
    reviewCount: product.reviewCount ?? 0,
    promotionLabel: product.promotionLabel,
    isNew: product.isNew ?? false,
    isBestseller: product.isBestseller ?? false,
    isFeatured: product.isFeatured ?? false,
    isFlashSale,
    stockQuantity: product.stockQuantity ?? 0,
    sku: product.sku,
    tags: product.tags ?? [],
    ingredients: product.ingredients,
    usageInfo: product.usageInfo,
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
    flashSale: product.flashSale,
  };
}

export async function getStoreNavigationData() {
  await connectToDatabase();

  const [categories, brands, settings] = await Promise.all([
    CategoryModel.find({ isActive: true, parentCategory: null }).sort({ order: 1 }).lean(),
    BrandModel.find({ isActive: true }).sort({ name: 1 }).limit(12).lean(),
    SiteSettingsModel.findOne().lean(),
  ]);

  return {
    categories: plain(categories),
    brands: plain(brands),
    settings: plain(settings),
  };
}

export async function getHomepageData() {
  await connectToDatabase();

  const [
    slides,
    categories,
    brands,
    settings,
    sections,
    featuredProducts,
    bestSellers,
    flashSaleProducts,
  ] = await Promise.all([
    HeroSlideModel.find({ isActive: true }).sort({ order: 1 }).lean(),
    CategoryModel.find({ isActive: true, isFeatured: true, parentCategory: null })
      .sort({ order: 1 })
      .limit(9)
      .lean(),
    BrandModel.find({ isActive: true, isFeatured: true }).sort({ name: 1 }).lean(),
    SiteSettingsModel.findOne().lean(),
    HomepageSectionConfigModel.find().sort({ position: 1 }).lean(),
    ProductModel.find({ isActive: true, isVisible: true, isFeatured: true })
      .populate("brand", "name slug")
      .populate("category", "name slug")
      .limit(8)
      .lean(),
    ProductModel.find({ isActive: true, isVisible: true, isBestseller: true })
      .populate("brand", "name slug")
      .populate("category", "name slug")
      .limit(8)
      .lean(),
    ProductModel.find({
      isActive: true,
      isVisible: true,
      "flashSale.isActive": true,
    })
      .populate("brand", "name slug")
      .populate("category", "name slug")
      .limit(8)
      .lean(),
  ]);

  const sectionMap = new Map(sections.map((section) => [section.key, section]));
  const flashSaleSection = sectionMap.get("flash-sale");
  const flashSaleEndsAt = flashSaleProducts
    .map((product) => product.flashSale?.endAt)
    .filter(Boolean)
    .sort()[0];

  return {
    slides: plain(slides),
    categories: plain(categories),
    brands: plain(brands),
    settings: plain(settings),
    sections: plain(sections),
    featuredProducts: featuredProducts.map(serializeProduct),
    bestSellers: bestSellers.map(serializeProduct),
    flashSaleProducts: flashSaleProducts
      .filter((product) =>
        isFlashSaleActive(
          product.flashSale?.isActive,
          product.flashSale?.startAt ? new Date(product.flashSale.startAt) : null,
          product.flashSale?.endAt ? new Date(product.flashSale.endAt) : null,
        ),
      )
      .map(serializeProduct),
    universeBanners: flashSaleSection?.banners ?? sectionMap.get("product-universes")?.banners ?? [],
    blogPosts,
    flashSaleEndsAt: flashSaleEndsAt ? new Date(flashSaleEndsAt) : addMilliseconds(new Date(), 3600000),
    sectionMap: Object.fromEntries(sectionMap),
  };
}

export async function getProducts(params?: {
  search?: string;
  categorySlug?: string;
  brandSlug?: string;
  promoOnly?: boolean;
  newOnly?: boolean;
  flashOnly?: boolean;
  sort?: string;
}) {
  await connectToDatabase();

  const query: Record<string, any> = { isActive: true, isVisible: true };

  if (params?.search) {
    query.$text = { $search: params.search };
  }

  if (params?.categorySlug) {
    const category = (await CategoryModel.findOne({
      slug: params.categorySlug,
    }).lean()) as any;
    if (category) {
      query.category = category._id;
    }
  }

  if (params?.brandSlug) {
    const brand = (await BrandModel.findOne({ slug: params.brandSlug }).lean()) as any;
    if (brand) {
      query.brand = brand._id;
    }
  }

  if (params?.promoOnly) {
    query.promoPrice = { $gt: 0 };
  }

  if (params?.newOnly) {
    query.isNew = true;
  }

  if (params?.flashOnly) {
    query["flashSale.isActive"] = true;
  }

  const sort: Record<string, SortOrder> =
    params?.sort === "price-asc"
      ? { regularPrice: 1 }
      : params?.sort === "price-desc"
        ? { regularPrice: -1 }
        : params?.sort === "best-rated"
          ? { ratingAverage: -1 }
          : { createdAt: -1 };

  const [products, brands, categories] = await Promise.all([
    ProductModel.find(query)
      .populate("brand", "name slug")
      .populate("category", "name slug")
      .sort(sort)
      .lean(),
    BrandModel.find({ isActive: true }).sort({ name: 1 }).lean(),
    CategoryModel.find({ isActive: true, parentCategory: null }).sort({ order: 1 }).lean(),
  ]);

  return {
    products: products
      .filter((product) =>
        params?.flashOnly
          ? isFlashSaleActive(
              product.flashSale?.isActive,
              product.flashSale?.startAt ? new Date(product.flashSale.startAt) : null,
              product.flashSale?.endAt ? new Date(product.flashSale.endAt) : null,
            )
          : true,
      )
      .map(serializeProduct),
    brands: plain(brands),
    categories: plain(categories),
  };
}

export async function getProductBySlug(slug: string) {
  await connectToDatabase();
  const product = (await ProductModel.findOne({ slug, isActive: true, isVisible: true })
    .populate("brand", "name slug logo shortText")
    .populate("category", "name slug")
    .populate("subcategory", "name slug")
    .lean()) as any;

  if (!product) return null;

  const [relatedProducts, reviews] = await Promise.all([
    ProductModel.find({
      _id: { $ne: product._id },
      category: product.category?._id,
      isActive: true,
      isVisible: true,
    })
      .populate("brand", "name slug")
      .populate("category", "name slug")
      .limit(4)
      .lean(),
    ReviewModel.find({ product: product._id, status: "approved" })
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  return {
    product: serializeProduct(product),
    relatedProducts: relatedProducts.map(serializeProduct),
    reviews: plain(reviews),
  };
}

export async function getCategoryBySlug(slug: string) {
  await connectToDatabase();
  const category = (await CategoryModel.findOne({ slug, isActive: true }).lean()) as any;
  if (!category) return null;
  const { products } = await getProducts({ categorySlug: slug });
  return { category: plain(category), products };
}

export async function getBrandBySlug(slug: string) {
  await connectToDatabase();
  const brand = (await BrandModel.findOne({ slug, isActive: true }).lean()) as any;
  if (!brand) return null;
  const { products } = await getProducts({ brandSlug: slug });
  return { brand: plain(brand), products };
}

export async function getWishlistForUser(userId: string) {
  await connectToDatabase();
  const wishlist = (await WishlistModel.findOne({ user: userId })
    .populate({
      path: "products",
      populate: [
        { path: "brand", select: "name slug" },
        { path: "category", select: "name slug" },
      ],
    })
    .lean()) as any;

  return wishlist?.products ? (wishlist.products as any[]).map(serializeProduct) : [];
}

export async function getOrdersForUser(userId: string) {
  await connectToDatabase();
  const orders = await OrderModel.find({ user: userId }).sort({ createdAt: -1 }).lean();
  return plain(orders);
}

export async function getOrderForUser(orderId: string, userId: string) {
  await connectToDatabase();
  const order = await OrderModel.findOne({ _id: orderId, user: userId }).lean();
  return plain(order);
}

export async function getCouponByCode(code: string) {
  await connectToDatabase();
  const coupon = (await CouponModel.findOne({
    code: code.toUpperCase(),
    isActive: true,
  }).lean()) as any;
  if (!coupon) return null;

  const now = Date.now();
  if (coupon.startsAt && new Date(coupon.startsAt).getTime() > now) return null;
  if (coupon.endsAt && new Date(coupon.endsAt).getTime() < now) return null;
  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) return null;
  return plain(coupon);
}

export async function getAdminDashboardData() {
  await connectToDatabase();

  const [totalUsers, totalOrders, totalProducts, orders, products, reviews] =
    await Promise.all([
      UserModel.countDocuments(),
      OrderModel.countDocuments(),
      ProductModel.countDocuments(),
      OrderModel.find().sort({ createdAt: -1 }).limit(5).populate("user", "name email").lean(),
      ProductModel.find({ stockQuantity: { $lt: 5 } })
        .sort({ stockQuantity: 1 })
        .limit(5)
        .lean(),
      ReviewModel.find({ status: "pending" }).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

  const allOrders = await OrderModel.find().lean();
  const totalSales = allOrders.reduce((sum, order) => sum + order.total, 0);

  return {
    stats: {
      totalUsers,
      totalOrders,
      totalProducts,
      totalSales,
      activeFlashSales: await ProductModel.countDocuments({
        "flashSale.isActive": true,
        isActive: true,
      }),
    },
    recentOrders: plain(orders),
    lowStockProducts: plain(products),
    pendingReviews: plain(reviews),
  };
}

export async function getAdminCollections() {
  await connectToDatabase();

  const [
    products,
    categories,
    brands,
    slides,
    sections,
    orders,
    users,
    reviews,
    coupons,
    campaigns,
    settings,
    subscribers,
  ] = await Promise.all([
    ProductModel.find()
      .populate("brand", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .lean(),
    CategoryModel.find().sort({ order: 1, name: 1 }).lean(),
    BrandModel.find().sort({ name: 1 }).lean(),
    HeroSlideModel.find().sort({ order: 1 }).lean(),
    HomepageSectionConfigModel.find().sort({ position: 1 }).lean(),
    OrderModel.find().populate("user", "name email").sort({ createdAt: -1 }).lean(),
    UserModel.find().sort({ createdAt: -1 }).lean(),
    ReviewModel.find()
      .populate("product", "name")
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .lean(),
    CouponModel.find().sort({ createdAt: -1 }).lean(),
    MarketingCampaignModel.find().sort({ createdAt: -1 }).lean(),
    SiteSettingsModel.findOne().lean(),
    NewsletterSubscriberModel.countDocuments({ isActive: true }),
  ]);

  return {
    products: products.map(serializeProduct),
    categories: plain(categories),
    brands: plain(brands),
    slides: plain(slides),
    sections: plain(sections),
    orders: plain(orders),
    users: plain(users),
    reviews: plain(reviews),
    coupons: plain(coupons),
    campaigns: plain(campaigns),
    settings: plain(settings),
    subscribers,
  };
}

export async function getSelectableCatalog() {
  await connectToDatabase();
  const [products, brands, categories] = await Promise.all([
    ProductModel.find().sort({ name: 1 }).select("name slug").lean(),
    BrandModel.find().sort({ name: 1 }).select("name slug").lean(),
    CategoryModel.find().sort({ order: 1, name: 1 }).select("name slug").lean(),
  ]);

  return {
    products: plain(products),
    brands: plain(brands),
    categories: plain(categories),
  };
}

export async function getProductById(id: string) {
  await connectToDatabase();
  const product = await ProductModel.findById(id).lean();
  return plain(product);
}

export async function getCategoryById(id: string) {
  await connectToDatabase();
  return plain(await CategoryModel.findById(id).lean());
}

export async function getBrandById(id: string) {
  await connectToDatabase();
  return plain(await BrandModel.findById(id).lean());
}

export async function getHeroSlideById(id: string) {
  await connectToDatabase();
  return plain(await HeroSlideModel.findById(id).lean());
}

export async function getSectionById(id: string) {
  await connectToDatabase();
  return plain(await HomepageSectionConfigModel.findById(id).lean());
}

export async function getCouponById(id: string) {
  await connectToDatabase();
  return plain(await CouponModel.findById(id).lean());
}

export async function getCampaignById(id: string) {
  await connectToDatabase();
  return plain(await MarketingCampaignModel.findById(id).lean());
}

export async function getSiteSettings() {
  await connectToDatabase();
  return plain(await SiteSettingsModel.findOne().lean());
}

export function getBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getFlashSaleCountdown(endAt: Date) {
  const ms = Math.max(differenceInMilliseconds(endAt, new Date()), 0);
  const hours = Math.floor(ms / 1000 / 60 / 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return {
    hours,
    minutes,
    seconds,
    label: `${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`,
  };
}

export function summarizeCartItems(products: Array<Record<string, any>>) {
  return products.map((product) => ({
    ...product,
    displayPrice: formatPrice(product.promoPrice ?? product.price),
  }));
}

export function toObjectId(id: string) {
  return new Types.ObjectId(id);
}
