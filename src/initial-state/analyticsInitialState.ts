import { ChartOptions } from 'chart.js';

/* 
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
*/

/* Event Type - bar chart */
export const eventTypeData = {
  labels: [
    'domestic',
    'neighbors',
    'gang',
    'transportation',
    'protests',
    'bullying',
  ],
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

export const eventTypeOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Count of Events per Type',
    },
  },
};

export const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Event Frequency',
      data: [10, 15, 8, 12, 20, 25, 18],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    },
  ],
};

export const lineOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Event Frequency Over Time',
    },
  },
};

export const dangerousLocationsData = {
  labels: [
    'Location A',
    'Location B',
    'Location C',
    'Location D',
    'Location E',
    'Location F',
    'Location G',
    'Location H',
    'Location I',
    'Location J',
  ],
  datasets: [
    {
      label: 'Most Dangerous Locations',
      data: [25, 20, 15, 10, 8, 7, 6, 5, 3, 1],
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

export const dangerousLocationsOptions: ChartOptions<'pie'> = {
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

export const recentEvents = [
  {
    type: 'Assault',
    title: 'Assault in Downtown',
    date: '2023-10-01 14:30',
    location: 'Downtown',
  },
  {
    type: 'Robbery',
    title: 'Bank Robbery',
    date: '2023-09-28 09:15',
    location: 'Main Street',
  },
  {
    type: 'Burglary',
    title: 'Home Burglary',
    date: '2023-09-25 22:00',
    location: 'Suburbs',
  },
];