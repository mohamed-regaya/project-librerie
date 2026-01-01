// les services se sont les fonctions javascript pureeeeee !!!!

import nameModel from "../models/NameModel.js";
import statsModel from "../models/statsModel.js";

const getAllNames = async () => {
  let result = await nameModel.find().populate("stats");
  return result;
};

const get_name_by_id = async (id) => {
  let result = await nameModel.findById(id).populate("stats");
  // let result = await nameModel.findOne({_id:id})
  // let result = await nameModel.find({_id:id})[0]
  return result;
};
/*
data = {
  "lastName":"hichem",
  "age":99,
  stats:{
  _id:4564545454reerer,
  localisation:gafsa,
  reglious:False,

  }
}


*/
/*
methode_1
const updateName = async (id, data) => {
  let id_stats = data.stats._id;
  let update_stats = data.stats;
  await statsModel.findByIdAndUpdate(id_stats, update_stats);
  delete data.stats
  let result = await nameModel.findOneAndUpdate({ _id: id }, data);
  //let result = await nameModel.findByIdAndUpdate(id, data);
  return result;
};
*/

const updateName = async (id, data) => {
  const { stats, ...rest } = data;
  await statsModel.findByIdAndUpdate(stats._id, stats);
  let result = await nameModel.findByIdAndUpdate(id, rest);
  //let result = await nameModel.findByIdAndUpdate(id, data);
  return result;
};

const addName = async (data) => {
  let newstats = new statsModel(data.stats);
  let savedstats = await newstats.save();
  data.stats = savedstats._id;
  let newName = new nameModel(data);
  let result = await newName.save();
  return result;
};

const deleteName = async (id) => {
  let name_to_delete = nameModel.findById(id);
  let stats_to_delete_id = name_to_delete.stats._id;
  await statsModel.findByIdAndDelete(stats_to_delete_id);
  let result = await nameModel.findByIdAndDelete(id);
  return result;
};

export default { addName, getAllNames, get_name_by_id, updateName, deleteName };
