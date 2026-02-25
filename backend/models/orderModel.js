import mongoose from "mongoose";
import userModel from "./userModel.js";

const orderSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash", "paypal"],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    products: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
