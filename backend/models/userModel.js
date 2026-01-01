import mongoose, { mongo } from "mongoose";
import addressModel from "./addressModel.js";
let userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: mongoose.Types.ObjectId,
    ref: addressModel,
  },
  image: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["worker", "chef", "admin"],
  },
});

let userModel = mongoose.model("user", userSchema);

export default userModel;
