import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { groupSalesByProduct } from "../../../utils/salesAnalytics.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByProductChart = ({ sales }) => {
  const grouped = groupSalesByProduct(sales);

  const data = {
    labels: Object.keys(grouped),
    datasets: [
      {
        data: Object.values(grouped),
        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#dc2626",
          "#9333ea",
          "#f59e0b",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Revenue by Product</h2>
      <Pie data={data} />
    </div>
  );
};

export default SalesByProductChart;
