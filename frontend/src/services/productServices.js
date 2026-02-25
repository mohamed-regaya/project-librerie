import axios from "axios";
import { store } from "../../redux/store";

// instance de axios (version personalisé mel axios )

let api = axios.create({
  baseURL: "http://localhost:8000/products",
});

api.interceptors.request.use((config) => {
  let state = store.getState();
  let token = state.auth.token;
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleAddProduct = (data) => {
  return api.post("/add_product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const handleGetAllProducts = async () => {
  let result = await api.get("/get_all_products");
  return result.data;
};

const handleDeleteProduct = async (id) => {
  await api.delete("/delete_product/" + id);
};

const handleGetProductById = async (id) => {
  let result = await api.get("/get_product_by_id/" + id);
  return result.data;
};

const handleUpdateProduct = (id, data) => {
  return api.put("/update_product/" + id, data, {
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
