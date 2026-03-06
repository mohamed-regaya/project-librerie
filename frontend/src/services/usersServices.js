import axios from "axios";
let BASE_URL = "http://localhost:8000/users";

import { store } from "../../redux/store";

// instance de axios (version personalisé mel axios )

let api = axios.create({
  baseURL: "http://localhost:8000/users",
});

api.interceptors.request.use((config) => {
  let state = store.getState();
  let token = state.auth.token;
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getAllUsers = async () => {
  let result = await api.get(BASE_URL + "/get_all_users");
  return result.data;
};

export default { getAllUsers };
