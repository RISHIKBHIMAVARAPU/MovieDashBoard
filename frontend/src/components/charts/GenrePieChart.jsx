import { Pie } from "react-chartjs-2";
import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenrePieChart = ({ genresCount }) => {
  const data = useMemo(() => ({
    labels: Object.keys(genresCount),
    datasets: [
      {
        data: Object.values(genresCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#9C27B0"],
      },
    ],
  }), [genresCount]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  }), []);

  return <div style={{ height: "300px" }}><Pie data={data} options={options} /></div>;
};

export default GenrePieChart;
