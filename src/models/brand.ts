import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const brandSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortText: String,
    logo: String,
    bannerImage: String,
    isActive: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type BrandDocument = InferSchemaType<typeof brandSchema>;
export const BrandModel = models.Brand || model("Brand", brandSchema);
