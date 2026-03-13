import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const cartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false },
);

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      sparse: true,
      index: true,
    },
    sessionId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
);

export type CartDocument = InferSchemaType<typeof cartSchema>;
export const CartModel = models.Cart || model("Cart", cartSchema);
