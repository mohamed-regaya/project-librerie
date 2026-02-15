import ProductModel from "../models/ProductModel.js";

const createProduct = async (data) => {
  return await ProductModel.create(data);
};

const getAllProducts = async () => {
  return await ProductModel.find();
};

const getProductById = async (id) => {
  return await ProductModel.findById(id);
};

const updateProduct = async (id, data) => {
  return await ProductModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteProduct = async (id) => {
  return await ProductModel.findByIdAndDelete(id);
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
