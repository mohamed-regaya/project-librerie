import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderService,
  deleteOrderService,
  getClientOrdersService,
} from "../services/orderService.js";

// CREATE
export const createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
export const getOrderById = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateOrder = async (req, res) => {
  try {
    const order = await updateOrderService(req.params.id, req.body);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteOrder = async (req, res) => {
  try {
    const order = await deleteOrderService(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClientOrder = async (req, res) => {
  try {
    const orders = await getClientOrdersService(req.params.id);

    if (!orders) return res.status(404).json({ message: "Order not found" });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
