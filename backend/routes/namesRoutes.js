import express from "express";
import namesController from "../controllers/namesController.js";

let namesRouter = express.Router();

namesRouter.get("/get_all", namesController.getAllNames);

namesRouter.get("/get_name_by_id/:id", namesController.getNameById);

namesRouter.post("/ajouter_name", namesController.addName);

namesRouter.put("/update_name_by_id/:id", namesController.updateName);

namesRouter.delete("/delete_name_by_id/:id", namesController.deleteName);

export default namesRouter;
