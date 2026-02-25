import axios from "axios";
import { store } from "../../redux/store";

// instance de axios (version personalisé mel axios )

let api = axios.create({
  baseURL: "http://localhost:8000/orders",
});

api.interceptors.request.use((config) => {
  let state = store.getState();
  let token = state.auth.token;
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CREATE
export const createOrder = async (orderData) => {
  const response = await api.post(`/create_order`, orderData);
  return response.data;
};

// GET ALL
export const getAllOrders = async () => {
  const response = await api.get(`/get_all_orders`);
  return response.data;
};

// GET BY ID
export const getOrderById = async (id) => {
  const response = await api.get(`/get_order_by_id/${id}`);
  return response.data;
};

// UPDATE
export const updateOrder = async (id, updatedData) => {
  const response = await api.put(`/update_order/${id}`, updatedData);
  return response.data;
};

// DELETE
export const deleteOrder = async (id) => {
  const response = await api.delete(`/delete_order/${id}`);
  return response.data;
};

// get client orders

export const getClientOrders = async (id) => {
  const response = await api.get(`/get_client_orders/${id}`);
  return response.data;
};
