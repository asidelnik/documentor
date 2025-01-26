import c from './AnalyticsPage.module.scss';
import { IconButton } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AnalyticsFilters from '../../components/analytics-filters/AnalyticsFilters';
import { useFetchAnalytics } from '../../hooks/useFetchAnalytics';
import { useState } from 'react';
import { RecentEvents } from '../../shared/components/charts/recent-events/RecentEvents';
import LineChart from '../../shared/components/charts/LineChart';
import BarChart from '../../shared/components/charts/BarChart';
import PieChart from '../../shared/components/charts/PieChart';
import MapSelectLatLng from '../../shared/components/MapSelectLatLng';
import { useAnalyticsFilters, useAnalyticsFiltersDispatch } from '../../contexts/analytics-filters-context';
import { LatLngLiteral } from 'leaflet';

export default function AnalyticsPage() {
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  const { analyticsData } = useFetchAnalytics();
  const [isShowMap, setIsShowMap] = useState<boolean>(false);
  const filters = useAnalyticsFilters();
  const filtersDispatch = useAnalyticsFiltersDispatch();
  console.log('Analytics page', filters.lat, filters.long);

  const updateLngLat = (center: LatLngLiteral) => filtersDispatch({ type: 'update-lng-lat', payload: center });

  return (
    <>
      <div className={c.container}>
        <aside className={toggleAside ? c.asideOpen : c.asideClose}>
          <div className={c.asideToggle}>
            <IconButton onClick={() => setToggleAside(!toggleAside)} aria-label="toggle aside">
              {toggleAside ? <KeyboardArrowLeftIcon /> : <FilterAltOutlinedIcon />}
            </IconButton>
            {/* Button to delete or reset all filters */}
          </div>
          <div className={toggleAside ? 'visible' : 'hidden'}>
            <AnalyticsFilters isShowMap={isShowMap} setIsShowMap={setIsShowMap} />
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
          {isShowMap &&
            <div className={c.map}>
              <MapSelectLatLng
                lat={filters.lat}
                lng={filters.long}
                radius={filters.radius || 100}
                setCenter={updateLngLat} />
            </div>
          }
        </main>
      </div>
    </>
  )
}