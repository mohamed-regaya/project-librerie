import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
  country: {
    type: String,
    require: false,
  },
  continent: {
    type: String,
    require: false,
  },
  distance: {
    type: Number,
    require: false,
  },
});

const sourceModel = mongoose.model("source", sourceSchema);

export default sourceModel;
