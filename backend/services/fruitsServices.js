import FruitModel from "../models/FruitModel.js";
import sourceModel from "../models/sourceModel.js";
import fruitRouter from "../routes/fruitsRoutes.js";

/*
data = req.body 
{
couleur:"",
prix:"",
name:"",
source : {
"localstion:",
sdsdsd:
sdsdsd:""
}
}


*/

const addfruit = async (data) => {
  let source = {
    country: data.country,
    continent: data.continent,
    distance: data.distance,
  };
  let sourcefruit = new sourceModel(source);
  let savedSourceFruit = await sourcefruit.save();
  data.source = savedSourceFruit._id; // j'ai ecrasé
  let newFruit = new FruitModel(data);
  let result = await newFruit.save(); // sauvgarder ca dans la base de donnes
  return result;
};

const getAllFruits = async () => {
  let result = await FruitModel.find().populate("source");
  return result;
};

const getFruitByColor = async (color) => {
  let result = await FruitModel.find({ couleur: color });
  return result;
};

const getFruitById = async (id) => {
  let result = await FruitModel.findOne({ _id: id }).populate("source");
  //mais reelement findById(id) ici l id cest l id du element au database _id
  return result;
};

const updateFruit = async (id, data) => {
  // data mch hiyya l mise a jour de fruit venont mel frontend
  const { source, ...rest } = data; //destruction
  console.log("source", source);
  console.log("reste", rest);
  await sourceModel.findByIdAndUpdate(source._id, source);
  let result = await FruitModel.findByIdAndUpdate(id, rest);
  return result;
};
/*
findOneAndDelete({_id : id}) ==> findByIdAndDelete(id);

*/

const deleteFruit = async (id) => {
  let fruit = await FruitModel.findById(id);
  let sourceId = fruit.source;
  await sourceModel.findByIdAndDelete(sourceId);
  let result = await FruitModel.findByIdAndDelete(id);
  return result;
};

export default {
  getAllFruits,
  getFruitById,
  addfruit,
  updateFruit,
  deleteFruit,
  getFruitByColor,
};
