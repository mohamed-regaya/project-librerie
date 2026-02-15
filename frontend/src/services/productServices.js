import axios from "axios";
let BASE_URL = "http://localhost:8000/products";

const handleAddProduct = (data) => {
  return axios.post(BASE_URL + "/add_product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const handleGetAllProducts = async () => {
  let result = await axios.get(BASE_URL + "/get_all_products");
  return result.data;
};

const handleDeleteProduct = async (id) => {
  await axios.delete(BASE_URL + "/delete_product/" + id);
};

const handleGetProductById = async (id) => {
  let result = await axios.get(BASE_URL + "/get_product_by_id/" + id);
  return result.data;
};

const handleUpdateProduct = (id, data) => {
  return axios.put(BASE_URL + "/update_product/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  handleAddProduct,
  handleGetAllProducts,
  handleDeleteProduct,
  handleGetProductById,
  handleUpdateProduct,
};
