import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { titleFontOptions } from '../../../constants/charts-constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'bar'> = {
  plugins: {
    title: {
      display: true,
      text: 'Count of Events per Type',
      font: titleFontOptions,
      color: 'hsl(0, 0%, 15%)',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  aspectRatio: 1,
  // scales: {}
};

const labels = [
  'domestic',
  'neighbors',
  'gang',
  'transportation',
  'protests',
  'bullying',
];

const data = {
  labels,
  datasets: [
    {
      label: 'Count of Events per Type',
      data: [3, 2, 1, 1, 1, 1],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

export default function BarChart() {
  return <Bar options={options} data={data} />
}