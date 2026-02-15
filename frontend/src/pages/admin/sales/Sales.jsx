import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import salesServices from "../../../services/salesServices";
import MonthlyRevenueChart from "./MonthlyRevenueChart";
import MonthlySalesChart from "./MonthlySalesChart";
import SalesByProductChart from "./SalesByProductChart";

const Sales = () => {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    salesServices.GetAllSales().then((result) => {
      setSales(result.data.data);
    });
  }, []);
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Product
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Product Price
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Stock
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Sale Qty
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Sale Price
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Total
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                No sales found
              </td>
            </tr>
          ) : (
            sales.map((sale) => {
              const total = sale.quantity * sale.sale_price;

              return (
                <tr
                  key={sale._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Product */}
                  <td className="px-4 py-3 flex items-center gap-3">
                    {sale.productId?.image && (
                      <img
                        src={`http://localhost:8000/uploads/${sale.productId.image}`}
                        alt={sale.productId.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <span className="font-medium text-gray-800">
                      {sale.productId?.name}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-gray-600">
                    {sale.productId?.category}
                  </td>

                  {/* Product Price */}
                  <td className="px-4 py-3 text-center text-gray-700">
                    ${sale.productId?.price}
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        sale.productId?.quantity > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sale.productId?.quantity}
                    </span>
                  </td>

                  {/* Sale Quantity */}
                  <td className="px-4 py-3 text-center font-semibold">
                    {sale.quantity}
                  </td>

                  {/* Sale Price */}
                  <td className="px-4 py-3 text-center text-gray-700">
                    ${sale.sale_price}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-3 text-center font-bold text-blue-600">
                    ${total}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MonthlyRevenueChart sales={sales} />
        <MonthlySalesChart sales={sales} />
        <SalesByProductChart sales={sales} />
      </div>
    </div>
  );
};

export default Sales;
