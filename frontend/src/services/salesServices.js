import axios from "axios";

let BASE_URL = import.meta.env.VITE_API_URL + "/sales";

function createSale(data) {
  return axios.post(BASE_URL + "/create_sale", data);
}

function GetAllSales() {
  return axios.get(BASE_URL + "/get_all_sales");
}

export default { createSale, GetAllSales };
