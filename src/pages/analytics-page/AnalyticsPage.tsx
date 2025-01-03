import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ChartOptions, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
  return (
    <>
      <h1>Analytics</h1>
      <p>Analytics page content</p>
      <Bar data={data} options={options} />
    </>
  )
}