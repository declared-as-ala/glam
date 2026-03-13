import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const trustItemSchema = new Schema(
  {
    title: String,
    description: String,
    icon: String,
  },
  { _id: false },
);

const socialLinkSchema = new Schema(
  {
    platform: String,
    href: String,
  },
  { _id: false },
);

const siteSettingsSchema = new Schema(
  {
    announcementBarText: String,
    whatsappLabel: String,
    phone: String,
    email: String,
    address: String,
    newsletterTitle: String,
    newsletterDescription: String,
    trustItems: { type: [trustItemSchema], default: [] },
    socialLinks: { type: [socialLinkSchema], default: [] },
  },
  { timestamps: true },
);

export type SiteSettingsDocument = InferSchemaType<typeof siteSettingsSchema>;
export const SiteSettingsModel =
  models.SiteSettings || model("SiteSettings", siteSettingsSchema);
