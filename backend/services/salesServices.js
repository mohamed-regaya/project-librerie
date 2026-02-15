import saleModel from "../models/sale.js";

export const createSaleService = async (saleData) => {
  return await saleModel.create(saleData);
};

export const getAllSalesService = async () => {
  return await saleModel.find().populate("productId"); // optional but recommended
};
