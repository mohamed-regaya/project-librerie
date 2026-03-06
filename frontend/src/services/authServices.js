import axios from "axios";

let BASE_URL = "http://localhost:8000/auth";

import { store } from "../../redux/store";

// instance de axios (version personalisé mel axios )

let api = axios.create({
  baseURL: "http://localhost:8000/auth",
});

api.interceptors.request.use((config) => {
  let state = store.getState();
  let token = state.auth.token;
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function handleLogin(data) {
  return axios.post(BASE_URL + "/login", data);
}

function handleRegister(data) {
  return axios.post(BASE_URL + "/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function sendResetEmail(email) {
  let result = await axios.post(BASE_URL + "/send_reset_password_email", {
    email: email,
  });
  return result.data;
}

async function verifyResetCode(email, code) {
  let result = await axios.post(BASE_URL + "/verify_reset_code", {
    email: email,
    code: code,
  });
  return result.data;
}

function getAllUsers() {
  return api.get("/get_all_users");
}

function deleteUser(id) {
  return api.delete("/delete_user/" + id);
}

async function resetPassword(userEmail, code, newPassword) {
  let result = await api.post("/reset_password", {
    email: userEmail,
    code: code,
    newPassword: newPassword,
  });
  return result.data;
}

export default {
  handleLogin,
  handleRegister,
  getAllUsers,
  deleteUser,
  sendResetEmail,
  verifyResetCode,
  resetPassword,
};
