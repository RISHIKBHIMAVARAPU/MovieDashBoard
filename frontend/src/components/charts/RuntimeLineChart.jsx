import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RuntimeLineChart = ({ avgRuntimeByYear }) => {
  const data = useMemo(() => ({
    labels: avgRuntimeByYear.map(y => y.year),
    datasets: [
      {
        label: "Average Runtime (min)",
        data: avgRuntimeByYear.map(y => y.avgRuntime),
        fill: false,
        borderColor: "rgba(255, 99, 132, 0.7)",
        tension: 0.1,
        pointBackgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  }), [avgRuntimeByYear]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
      title: { display: true, text: "Average Runtime per Year" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }), []);

  return (
    <div style={{ height: "300px" }}>
      {avgRuntimeByYear.length > 0 && <Line data={data} options={options} />}
    </div>
  );
};

export default RuntimeLineChart;
