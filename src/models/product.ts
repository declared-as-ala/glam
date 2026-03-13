import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const productImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: String,
    isPrimary: { type: Boolean, default: false },
    position: { type: Number, default: 0 },
  },
  { _id: false },
);

const flashSaleSchema = new Schema(
  {
    isActive: { type: Boolean, default: false },
    startAt: Date,
    endAt: Date,
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: String,
    fullDescription: String,
    ingredients: String,
    usageInfo: String,
    sku: { type: String, required: true, unique: true },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    images: { type: [productImageSchema], default: [] },
    stockQuantity: { type: Number, default: 0 },
    regularPrice: { type: Number, required: true },
    promoPrice: Number,
    promotionLabel: String,
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true, index: true },
    isVisible: { type: Boolean, default: true, index: true },
    flashSale: { type: flashSaleSchema, default: () => ({}) },
    ratingAverage: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true, suppressReservedKeysWarning: true },
);

productSchema.index({ name: "text", shortDescription: "text", fullDescription: "text" });

export type ProductDocument = InferSchemaType<typeof productSchema>;
export const ProductModel = models.Product || model("Product", productSchema);
