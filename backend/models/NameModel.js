import mongoose from "mongoose";
import statsModel from "./statsModel.js";
let nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  stats: {
    type: mongoose.Types.ObjectId,
    ref: statsModel,
  },
});

let nameModel = mongoose.model("name", nameSchema);

export default nameModel;

/*
 stats:{
 pourcentage:Number,
 most_localisation:"tunisia"
 religious :True/false
 }


*/
