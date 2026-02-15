import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { groupSalesByMonth } from "../../../utils/salesAnalytics.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const MonthlyRevenueChart = ({ sales }) => {
  const grouped = groupSalesByMonth(sales);

  const data = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Monthly Revenue",
        data: Object.values(grouped).map((m) => m.revenue),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Monthly Revenue</h2>
      <Line data={data} />
    </div>
  );
};

export default MonthlyRevenueChart;
