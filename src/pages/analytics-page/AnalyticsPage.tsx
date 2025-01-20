import c from './AnalyticsPage.module.scss';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import EventIcon from '@mui/icons-material/Event';
import { recentEvents } from '../../initial-state/analyticsInitialState';
import LineChart from '../../shared/components/charts/LineChart';
import BarChart from '../../shared/components/charts/BarChart';
import PieChart from '../../shared/components/charts/PieChart';


export default function AnalyticsPage() {
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  // const [year, setYear] = useState<number>(2023);
  // const [type, setType] = useState<string>('All');
  // const [timePeriod, setTimePeriod] = useState<string>('2023');

  // useEffect(() => {
  //   return () => {
  //     ChartJS.instances.forEach(instance => instance.destroy());
  //   };
  // }, []);

  return (
    <>
      <AnalyticsFiltersProvider>

          <div className={toggleAside ? 'visible' : 'hidden'}></div>
        </aside>
        <main>
          {/* <div>
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
          </div> */}
          <div className={c.chartBox}>
            <LineChart />
          </div>
          <div className={c.secondChartsRow}>
            <div className={c.chartBox}>
              <BarChart />
            </div>
            <div className={c.chartBox}>
              <PieChart />
            </div>

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
      </AnalyticsFiltersProvider>
    </>
  )
}