import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Distribution of 10 Most Dangerous Locations',
    },
  },
};

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Most Dangerous Locations',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart() {
  return <Pie data={data} options={options} />;
}


// export const dangerousLocationsData = {
//   labels: [
//     'Location A',
//     'Location B',
//     'Location C',
//     'Location D',
//     'Location E',
//     'Location F',
//     'Location G',
//     'Location H',
//     'Location I',
//     'Location J',
//   ],
//   datasets: [
//     {
//       label: 'Most Dangerous Locations',
//       data: [25, 20, 15, 10, 8, 7, 6, 5, 3, 1],
//       backgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//         '#FF6384',
//       ],
//       hoverBackgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//         '#FF6384',
//       ],
//     },
//   ],
// };

// export const dangerousLocationsOptions: ChartOptions<'pie'> = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Distribution of 10 Most Dangerous Locations',
//     },
//   },
// };