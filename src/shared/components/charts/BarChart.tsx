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
    },
  },
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
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
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

export default function BarChart() {
  return <Bar options={options} data={data} />;
}



// export const eventTypeData = {
//   datasets: [
//     {
//       label: 'Count of Events per Type',
//       data: [3, 2, 1, 1, 1, 1],
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1,
//     },
//   ],
// };


// export const eventTypeOptions: ChartOptions<'bar'> = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Count of Events per Type',
//     },
//   },
// };