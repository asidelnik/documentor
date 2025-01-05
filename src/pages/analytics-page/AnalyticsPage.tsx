import c from './AnalyticsPage.module.scss';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { barData, barOptions, pieData, pieOptions } from '../../initial-state/analyticsInitialState';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import EventIcon from '@mui/icons-material/Event'; // Example icon, replace with appropriate icons
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const recentEvents = [
  { type: 'Assault', title: 'Assault in Downtown', date: '2023-10-01 14:30', location: 'Downtown' },
  { type: 'Robbery', title: 'Bank Robbery', date: '2023-09-28 09:15', location: 'Main Street' },
  { type: 'Burglary', title: 'Home Burglary', date: '2023-09-25 22:00', location: 'Suburbs' },
];

export default function AnalyticsPage() {
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  const [year, setYear] = useState<number>(2023);

  return (
    <>
      <div className={c.container}>
        <aside className={toggleAside ? c.asideOpen : c.asideClose}>
          <div className={c.asideToggle}>
            <IconButton onClick={() => setToggleAside(!toggleAside)} aria-label="toggle aside">
              <FilterListRoundedIcon />
            </IconButton>
          </div>

          <div className={toggleAside ? 'visible' : 'hidden'}></div>
        </aside>
        <main>
          <div>
            <label htmlFor="year">Filter by Year: </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              min="2000"
              max="2100"
            />
          </div>
          <Bar data={barData} options={barOptions} />
          <Pie data={pieData} options={pieOptions} />

          <div className={c.recentEvents}>
            <h2>Recent Events</h2>
            {recentEvents.map((event, index) => (
              <div key={index} className={c.eventItem}>
                <EventIcon />
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}