import {
  createSaleService,
  getAllSalesService,
} from "../services/salesServices.js";

export const createSaleController = async (req, res) => {
  try {
    const sale = await createSaleService(req.body);

    res.status(201).json({
      success: true,
      message: "Sale created successfully",
      data: sale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSalesController = async (req, res) => {
  try {
    const sales = await getAllSalesService();

    res.status(200).json({
      success: true,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
