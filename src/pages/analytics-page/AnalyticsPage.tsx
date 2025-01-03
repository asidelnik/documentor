import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ChartOptions, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Violent Events',
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Violent Events Over Time',
    },
  },
};

export default function AnalyticsPage() {
  return (
    <>
      <h1>Analytics</h1>
      <p>Analytics page content</p>
      <Bar data={data} options={options} />
    </>
  )
}