import axios from "axios";

let BASE_URL = "http://localhost:8000/auth";

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

function getAllUsers() {
  return axios.get(BASE_URL + "/get_all_users");
}

function deleteUser(id) {
  return axios.delete(BASE_URL + "/delete_user/" + id);
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

async function resetPassword(userEmail, code, newPassword) {
  let result = await axios.post(BASE_URL + "/reset_password", {
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
