import mongoose, { type InferSchemaType } from "mongoose";

const { model, models, Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
      index: true,
    },
    phone: String,
    image: String,
    isBlocked: { type: Boolean, default: false },
    registeredAt: { type: Date, default: Date.now },
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = models.User || model("User", userSchema);
