import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);

export type WishlistDocument = InferSchemaType<typeof wishlistSchema>;
export const WishlistModel =
  models.Wishlist || model("Wishlist", wishlistSchema);
