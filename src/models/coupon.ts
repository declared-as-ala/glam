import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ["percent", "amount"], default: "percent" },
    value: { type: Number, required: true },
    minOrderAmount: { type: Number, default: 0 },
    startsAt: Date,
    endsAt: Date,
    usageLimit: Number,
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type CouponDocument = InferSchemaType<typeof couponSchema>;
export const CouponModel = models.Coupon || model("Coupon", couponSchema);
