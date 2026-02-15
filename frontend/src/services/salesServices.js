import axios from "axios";

function createSale(data) {
  return axios.post("http://localhost:8000/sales/create_sale", data);
}

function GetAllSales() {
  return axios.get("http://localhost:8000/sales/get_all_sales");
}

export default { createSale, GetAllSales };
