import axios from "axios";
let BASE_URL = "http://localhost:8000/users";

const getAllUsers = async () => {
  let result = await axios.get(BASE_URL + "/get_all_users");
  return result.data;
};

export default { getAllUsers };
