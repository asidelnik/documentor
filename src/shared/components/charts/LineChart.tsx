import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { titleFontOptions } from '../../../constants/charts-constants';
import { IEventsFrequencyOverTime } from '../../../types/IAnalytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Event Frequency Over Time',
      font: titleFontOptions,
      color: 'hsl(0, 0%, 15%)',
    },
  },
};

const labels: Array<string> = [];

const lineData = {
  labels,
  datasets: [
    {
      label: 'Event Frequency',
      data: [],
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    },
  ],
};

interface ILineChartProps {
  data: Array<IEventsFrequencyOverTime>;
}

export default function LineChart({ data }: ILineChartProps) {
  const lineDataUpdated = { ...lineData, labels: data.map((d) => d.monthName), datasets: [{ ...lineData.datasets[0], data: data.map((d) => d.eventsCount) }] };
  return <Line options={options} data={lineDataUpdated} />;
}
