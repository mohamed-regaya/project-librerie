import express from "express";
import fruitscontroller from "../controllers/fruitscontroller.js";
import upload from "../middlewares/multer.js";
import verifyJWT from "../middlewares/jwtMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
let fruitRouter = express.Router();

// =====================================
// GET : tous les fruits
// =====================================
fruitRouter.get(
  "/get_all",
  verifyJWT,
  roleMiddleware("chef"),
  fruitscontroller.getAllFruits
);

// =====================================
// GET : fruit par ID
// =====================================
fruitRouter.get("/get_fruit_by_id/:id", fruitscontroller.getFruitById);

// =====================================
// POST : ajouter un fruit
// =====================================
fruitRouter.post(
  "/add_fruit",
  upload.single("image"), //multer va sauvgarder l'iage dans le dossier , et retouner le path string
  fruitscontroller.AddFruit
);

// =====================================
// PUT : modifier un fruit
// =====================================
fruitRouter.put("/update_fruit/:id", fruitscontroller.updateFruit);

// =====================================
// DELETE : supprimer un fruit
// =====================================
fruitRouter.delete("/delete_fruit/:id", fruitscontroller.deletFruit);

export default fruitRouter;
