import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const marketingCampaignSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    audience: {
      type: String,
      enum: ["all-users", "newsletter", "customers"],
      default: "newsletter",
    },
    status: {
      type: String,
      enum: ["draft", "sent"],
      default: "draft",
      index: true,
    },
    sentAt: Date,
    recipientsCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type MarketingCampaignDocument = InferSchemaType<
  typeof marketingCampaignSchema
>;

export const MarketingCampaignModel =
  models.MarketingCampaign || model("MarketingCampaign", marketingCampaignSchema);
