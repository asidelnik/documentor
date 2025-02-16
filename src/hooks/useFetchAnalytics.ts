import { useEffect, useState } from 'react';
import { IFetchState } from '../types/IAnalytics';
import { serverRoutes } from '../server/server-routes';
import { analyticsFetchInitialState } from '../initial-state/analyticsFetchInitialState';
import { useAnalyticsFilters } from '../contexts/analytics/useAnalyticsFilters';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useFetchAnalytics = () => {
  const filters = useAnalyticsFilters();
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

    async function fetchData(path: string, stateProperty: keyof IFetchState) {
      try {
        setAnalyticsData((a) => ({
          ...a,
          [stateProperty]: { ...a[stateProperty], isLoading: true },
        }));
        const response = await fetch(baseUrl + path);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const eventsRes = await response.json();

        setAnalyticsData((a) => ({
          ...a,
          [stateProperty]: { ...a[stateProperty], data: eventsRes },
        }));
      } catch (error: unknown) {
        setAnalyticsData((a) => ({
          ...a,
          [stateProperty]: {
            ...a[stateProperty],
            errorMessage: 'Error',
            isError: true,
          },
        }));
      }
    }
  }, [filters]);

  return { analyticsData };
};
