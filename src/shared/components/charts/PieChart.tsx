import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { titleFontOptions } from '../../../constants/charts-constants';
import { IDangerousCity } from '../../../types/IAnalytics';

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '8 Most Dangerous Cities',
      font: titleFontOptions,
      color: 'hsl(0, 0%, 15%)',
    },
  },
  aspectRatio: 1,
};

const pieData = {
  labels: [],
  datasets: [
    {
      label: '8 Most Dangerous Cities',
      data: [],
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

interface IPieChartProps {
  data: Array<IDangerousCity>;
}

export default function PieChart({ data }: IPieChartProps) {
  const pieDataUpdate = { ...pieData, labels: data.map((city) => city.cityName), datasets: [{ ...pieData.datasets[0], data: data.map((city) => city.eventsCount) }] };
  return <Pie options={options} data={pieDataUpdate} />;
}