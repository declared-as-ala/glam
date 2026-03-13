import mongoose, { type InferSchemaType, type Types } from "mongoose";

const { model, models, Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    icon: String,
    bannerImage: String,
    seoTitle: String,
    seoDescription: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false },
    parentCategory: { type: Schema.Types.ObjectId, ref: "Category" as const },
  },
  { timestamps: true },
);

categorySchema.index({ parentCategory: 1, order: 1 });

export type CategoryDocument = InferSchemaType<typeof categorySchema> & {
  _id: Types.ObjectId;
};

export const CategoryModel = models.Category || model("Category", categorySchema);
