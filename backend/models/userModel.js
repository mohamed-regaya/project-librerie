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
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["worker", "chef", "admin"],
  },
  resetCode: {
    type: String,
  },
});

let userModel = mongoose.model("user", userSchema);

export default userModel;
