import c from './AnalyticsPage.module.scss';
import { IconButton } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AnalyticsFilters from '../../components/analytics-filters/AnalyticsFilters';
import { useFetchAnalytics } from '../../hooks/useFetchAnalytics';
import { useState } from 'react';
import { RecentEvents } from '../../shared/components/charts/RecentEvents';
import LineChart from '../../shared/components/charts/LineChart';
import BarChart from '../../shared/components/charts/BarChart';
import PieChart from '../../shared/components/charts/PieChart';


export default function AnalyticsPage() {
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  const { analyticsData } = useFetchAnalytics();

  return (
    <>
      <div className={c.container}>
        <aside className={toggleAside ? c.asideOpen : c.asideClose}>
          <div className={c.asideToggle}>
            <IconButton onClick={() => setToggleAside(!toggleAside)} aria-label="toggle aside">
              {toggleAside ? <KeyboardArrowLeftIcon /> : <FilterAltOutlinedIcon />}
              {/* Reset to default filtering */}
            </IconButton>
          </div>

          <div className={toggleAside ? 'visible' : 'hidden'}>
            <AnalyticsFilters />
          </div>
        </aside>
        <main>
          <div className={c.chartBox}>
            <LineChart data={analyticsData.eventsFrequencyOverTime.data} />
          </div>
          <div className={c.secondChartsRow}>
            <div className={c.chartBox}>
              <BarChart data={analyticsData.eventsCountPerType.data} />
            </div>
            <div className={c.chartBox}>
              <PieChart data={analyticsData.dangerousCities.data} />
            </div>

            <div className={c.recentEvents}>
              <h2>Recent Events</h2>
              <RecentEvents recentEvents={analyticsData.recentEvents.data} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}