import namesServices from "../services/namesServices.js";

const getAllNames = async (req, res) => {
  let data = await namesServices.getAllNames();

  return res.json({ data: data });
};

const getNameById = (req, res) => {
  let data = namesServices.get_name_by_id(req.params.id);
  return res.json({ data: data });
};

const addName = (req, res) => {
  console.log("hello");
  let result = namesServices.addName(req.body);
  return res.json({ data: result });
};

const updateName = (req, res) => {
  let result = namesServices.updateName(req.params.id, req.body);
  return res.json({ data: result });
};

const deleteName = (req, res) => {
  let result = namesServices.deleteName(req.params.id);
  return res.json({ data: result });
};

export default { getAllNames, addName, getNameById, updateName, deleteName };
