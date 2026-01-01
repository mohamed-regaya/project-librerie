import mongoose from "mongoose";

let addressSchema = new mongoose.Schema({
  city: {
    type: String,
    require: false,
  },
  postale_code: {
    type: Number,
    require: false,
  },
  country: {
    type: String,
    require: false,
  },
});

let addressModel = mongoose.model("address", addressSchema);

export default addressModel;

/*

{
_id:45454545454545454
city : "tunis",
postale_code:2190,
country:"tunisia"
}

*/
