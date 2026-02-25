import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getClientOrder,
} from "../controllers/orderController.js";
import verifyJWT from "../middlewares/jwtMiddleware.js";

const router = express.Router();

router.post("/create_order", verifyJWT(["client"]), createOrder);
router.get("/get_all_orders", verifyJWT(["admin"]), getAllOrders);
router.get("/get_order_by_id/:id", verifyJWT(["admin"]), getOrderById);
router.put("/update_order/:id", verifyJWT(["admin"]), updateOrder);
router.delete("/delete_order/:id", verifyJWT(["admin"]), deleteOrder);
router.get(
  "/get_client_orders/:id",
  verifyJWT(["admin", "client"]),
  getClientOrder,
);

export default router;
