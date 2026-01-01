import mongoose from "mongoose";
import sourceModel from "./sourceModel.js";
const FruitSchema = new mongoose.Schema({
  // plan mta3 eddar
  nom: {
    type: String,
    require: true,
  },
  couleur: {
    type: String, //kosksi bel batata
    require: true,
    enum: ["rouge", "vert", "bleu", "noir", "jaune"],
  },

  prix: {
    type: Number,
    require: true,
  },
  source: {
    type: mongoose.Types.ObjectId,
    ref: sourceModel,
  },
  image: {
    type: String,
    require: true,
  },
});

let FruitModel = mongoose.model("fruit", FruitSchema); // hiyya eddar ki tebnet

export default FruitModel; // houwa l classe
