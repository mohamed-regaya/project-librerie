import mongoose from "mongoose";
import ProductModel from "./ProductModel.js";

let saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: ProductModel,
    },
    quantity: {
      type: Number,
    },
    sale_price: {
      type: Number,
    },
  },
  { timestamps: true }
);

let saleModel = mongoose.model("sale", saleSchema);

export default saleModel;
