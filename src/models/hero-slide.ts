import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const heroSlideSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    ctaText: String,
    ctaLink: String,
    desktopImage: { type: String, required: true },
    mobileImage: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export type HeroSlideDocument = InferSchemaType<typeof heroSlideSchema>;
export const HeroSlideModel =
  models.HeroSlide || model("HeroSlide", heroSlideSchema);
