import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: String,
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "hidden"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true },
);

export type ReviewDocument = InferSchemaType<typeof reviewSchema>;
export const ReviewModel = models.Review || model("Review", reviewSchema);
