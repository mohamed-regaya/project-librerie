import express from "express";
import {
  createSaleController,
  getAllSalesController,
} from "../controllers/salesController.js";

const router = express.Router();

router.post("/create_sale", createSaleController);
router.get("/get_all_sales", getAllSalesController);

export default router;
