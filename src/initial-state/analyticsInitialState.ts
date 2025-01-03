import { ChartOptions } from 'chart.js';

export const barData = {
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

export const barOptions: ChartOptions<'bar'> = {
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

export const pieData = {
  labels: [
    'Country A',
    'Country B',
    'Country C',
    'Country D',
    'Country E',
    'Country F',
    'Country G',
    'Country H',
    'Country I',
    'Country J',
  ],
  datasets: [
    {
      label: 'Violent Events by Country',
      data: [30, 20, 15, 10, 8, 7, 5, 3, 1, 1],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF6384',
      ],
    },
  ],
};

export const pieOptions: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Percentage of Violent Events by Country',
    },
  },
};
