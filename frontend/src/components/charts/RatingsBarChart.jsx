import { Bar } from "react-chartjs-2";
import { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RatingsBarChart = ({ avgRatingsByGenre }) => {
  const data = useMemo(() => ({
    labels: avgRatingsByGenre.map(g => g.genre),
    datasets: [
      {
        label: "Average Rating",
        data: avgRatingsByGenre.map(g => g.avgRating),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }), [avgRatingsByGenre]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10, // if your rating scale is 0-10
      },
    },
  }), []);

  return (
    <div style={{ height: "300px" }}>
      {avgRatingsByGenre.length > 0 && <Bar data={data} options={options} />}
    </div>
  );
};

export default RatingsBarChart;
