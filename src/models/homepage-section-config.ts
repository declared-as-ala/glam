import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const bannerItemSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    link: String,
    accentColor: String,
  },
  { _id: false },
);

const homepageSectionConfigSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    title: String,
    subtitle: String,
    isVisible: { type: Boolean, default: true },
    position: { type: Number, default: 0 },
    productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    brandIds: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
    categoryIds: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    banners: { type: [bannerItemSchema], default: [] },
  },
  { timestamps: true },
);

export type HomepageSectionConfigDocument = InferSchemaType<
  typeof homepageSectionConfigSchema
>;

export const HomepageSectionConfigModel =
  models.HomepageSectionConfig ||
  model("HomepageSectionConfig", homepageSectionConfigSchema);
