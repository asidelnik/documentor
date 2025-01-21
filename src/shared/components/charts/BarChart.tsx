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
import { IEventsCountPerType } from '../../../types/IAnalytics';
import { eventTypeNumOptions } from '../../../constants/event-constants';

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

const labels: Array<string> = [];

const barData = {
  labels,
  datasets: [
    {
      label: 'Count of Events per Type',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};

interface IBarChartProps {
  data: Array<IEventsCountPerType>;
}

export default function BarChart({ data }: IBarChartProps) {
  const barDataUpdated = { ...barData, labels: data.map((d) => eventTypeNumOptions[d.type]), datasets: [{ ...barData.datasets[0], data: data.map((d) => d.count) }] };
  return <Bar options={options} data={barDataUpdated} />
}