import orderModel from "../models/orderModel.js";

// CREATE
export const createOrderService = async (data) => {
  return await orderModel.create(data);
};

// GET ALL
export const getAllOrdersService = async () => {
  return await orderModel
    .find()
    .populate("client_id", "name email")
    .sort({ createdAt: -1 });
};

// GET BY ID
export const getOrderByIdService = async (id) => {
  return await orderModel.findById(id).populate("client_id", "name email");
};

// UPDATE
export const updateOrderService = async (id, data) => {
  return await orderModel.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
export const deleteOrderService = async (id) => {
  return await orderModel.findByIdAndDelete(id);
};

// get client orders

export const getClientOrdersService = async (id) => {
  return await orderModel.find({ client_id: id });
};
