import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    productSlug: { type: String, required: true },
    image: String,
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    lineTotal: { type: Number, required: true },
  },
  { _id: false },
);

const addressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    postalCode: String,
    country: { type: String, required: true, default: "Tunisie" },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: { type: [orderItemSchema], default: [] },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    discountTotal: { type: Number, default: 0 },
    total: { type: Number, required: true },
    couponCode: String,
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "paid",
        "preparing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
      index: true,
    },
    shippingAddress: { type: addressSchema, required: true },
    notes: String,
  },
  { timestamps: true },
);

export type OrderDocument = InferSchemaType<typeof orderSchema>;
export const OrderModel = models.Order || model("Order", orderSchema);
