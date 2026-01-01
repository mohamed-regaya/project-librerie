import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  pourcentage: {
    type: Number,
    require: false,
  },
  most_localisation: {
    type: String,
    require: false,
  },
  religious: {
    type: Boolean,
    require: false,
  },
});

const statsModel = mongoose.model("stats", statsSchema);
export default statsModel;
