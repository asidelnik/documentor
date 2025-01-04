import c from './AnalyticsPage.module.scss';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { barData, barOptions, pieData, pieOptions } from '../../initial-state/analyticsInitialState';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);



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
          {/* <div style={{ width: '700px' }}> */}
            <Bar data={barData} options={barOptions} />
          {/* </div> */}
          <Pie data={pieData} options={pieOptions} />
        </main>
      </div>
    </>
  )
}