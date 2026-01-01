import fruitsServices from "../services/fruitsServices.js";

const getAllFruits = async (req, res) => {
  let result = await fruitsServices.getAllFruits();
  res.json({ resultat: result });
};

const getFruitById = async (req, res) => {
  let result = await fruitsServices.getFruitById(req.params.id);
  if (!result) {
    res.json({ msg: "fruit on trouvé" });
  } else {
    res.json({ msg: result });
  }
};
// le
const AddFruit = async (req, res) => {
  let new_req_body = { ...req.body, image: req.file.path };
  // req.body.image = req.file.path
  let result = await fruitsServices.addfruit(new_req_body); // {"fruit":"bsjdkqd"}
  res.json({ message: "Fruit ajouté", resultat: result });
};

const updateFruit = async (req, res) => {
  let result = await fruitsServices.updateFruit(req.params.id, req.body);
  res.json({ message: "Fruit mis à jour", resultat: result });
};

const deletFruit = async (req, res) => {
  let reslut = await fruitsServices.deleteFruit(req.params.id);
  res.json({ message: "Fruit supprimé", resultat: reslut });
};

export default {
  AddFruit,
  deletFruit,
  getAllFruits,
  getFruitById,
  updateFruit,
};
