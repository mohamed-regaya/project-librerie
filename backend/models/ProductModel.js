import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String, //kosksi bel batata
  },
  category: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

let ProductModel = mongoose.model("product", ProductSchema); // hiyya eddar ki tebnet

export default ProductModel; // houwa l classe
