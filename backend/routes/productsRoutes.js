import express from "express";
import productController from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import verifyJWT from "../middlewares/jwtMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/add_product",
  upload.single("image"),
  productController.createProduct
);

router.get("/get_all_products", productController.getAllProducts);

router.get("/get_product_by_id/:id", productController.getProductById);

router.put(
  "/update_product/:id",
  upload.single("image"),
  productController.updateProduct
);

router.delete(
  "/delete_product/:id",

  productController.deleteProduct
);

export default router;
