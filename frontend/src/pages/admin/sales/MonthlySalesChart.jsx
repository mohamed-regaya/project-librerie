import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { groupSalesByMonth } from "../../../utils/salesAnalytics.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlySalesChart = ({ sales }) => {
  const grouped = groupSalesByMonth(sales);

  const data = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Sales Quantity",
        data: Object.values(grouped).map((m) => m.quantity),
        backgroundColor: "#16a34a",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Monthly Sales Volume</h2>
      <Bar data={data} />
    </div>
  );
};

export default MonthlySalesChart;
