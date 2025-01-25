import { useEffect, useState } from 'react';
import { IFetchState } from '../types/IAnalytics';
import { useAnalyticsFilters } from '../contexts/analytics-filters-context';
import { serverRoutes } from '../server/server-routes';
import { analyticsFetchInitialState } from '../initial-state/analyticsFetchInitialState';

export const useFetchAnalytics = () => {
  const filters = useAnalyticsFilters();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [analyticsData, setAnalyticsData] = useState<IFetchState>(
    analyticsFetchInitialState
  );

  useEffect(() => {
    fetchData(serverRoutes.analytics.recentEvents(filters), 'recentEvents');
    fetchData(
      serverRoutes.analytics.eventsCountPerType(filters),
      'eventsCountPerType'
    );
    fetchData(
      serverRoutes.analytics.dangerousCities(filters),
      'dangerousCities'
    );
    fetchData(
      serverRoutes.analytics.eventsFrequencyOverTime(filters),
      'eventsFrequencyOverTime'
    );
  }, [filters]);

  const fetchData = async (path: string, stateProperty: keyof IFetchState) => {
    try {
      setAnalyticsData({
        ...analyticsData,
        [stateProperty]: { ...analyticsData[stateProperty], isLoading: true },
      });
      const response = await fetch(baseUrl + path);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const eventsRes = await response.json();

      setAnalyticsData({
        ...analyticsData,
        [stateProperty]: { ...analyticsData[stateProperty], data: eventsRes },
      });
    } catch (error) {
      setAnalyticsData({
        ...analyticsData,
        [stateProperty]: {
          ...analyticsData[stateProperty],
          errorMessage: 'Error',
          isError: true,
        },
      });
    }
  };

  return { analyticsData };
};
