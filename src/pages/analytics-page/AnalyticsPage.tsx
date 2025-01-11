import c from './AnalyticsPage.module.scss';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { eventTypeData, eventTypeOptions, lineData, lineOptions, dangerousLocationsData, dangerousLocationsOptions, recentEvents } from '../../initial-state/analyticsInitialState';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import EventIcon from '@mui/icons-material/Event'; // Example icon, replace with appropriate icons

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


export default function AnalyticsPage() {
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  const [year, setYear] = useState<number>(2023);
  const [type, setType] = useState<string>('All');
  const [timePeriod, setTimePeriod] = useState<string>('2023');

  // useEffect(() => {
  //   return () => {
  //     ChartJS.instances.forEach(instance => instance.destroy());
  //   };
  // }, []);

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

          <div>
            <label htmlFor="type">Filter by Type: </label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="All">All</option>
              <option value="Assault">Assault</option>
              <option value="Robbery">Robbery</option>
              <option value="Burglary">Burglary</option>
            </select>
          </div>

          <div>
            <label htmlFor="timePeriod">Filter by Time Period: </label>
            <input
              type="text"
              id="timePeriod"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            />
          </div>

          {/* <Bar data={barData} options={barOptions} />
          <Pie data={pieData} options={pieOptions} /> */}
          {/*  */}
          <Bar data={eventTypeData} options={eventTypeOptions} />
          <Line data={lineData} options={lineOptions} />
          <Pie data={dangerousLocationsData} options={dangerousLocationsOptions} />

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