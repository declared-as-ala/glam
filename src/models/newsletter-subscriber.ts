import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const newsletterSubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    name: String,
    isActive: { type: Boolean, default: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

export type NewsletterSubscriberDocument = InferSchemaType<
  typeof newsletterSubscriberSchema
>;

export const NewsletterSubscriberModel =
  models.NewsletterSubscriber ||
  model("NewsletterSubscriber", newsletterSubscriberSchema);
