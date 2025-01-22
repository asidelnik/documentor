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
  // let fetchController = new AbortController();

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
    // return () => fetchController.abort();
  }, [filters]);

  const fetchData = async (path: string, stateProperty: keyof IFetchState) => {
    // fetchController.abort('Newer fetch called');
    // fetchController = new AbortController();
    // const { signal } = fetchController;
    try {
      setAnalyticsData({
        ...analyticsData,
        [stateProperty]: { ...analyticsData[stateProperty], isLoading: true },
      });
      const response = await fetch(baseUrl + path); //, { signal });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const eventsRes = await response.json();

      setAnalyticsData({
        ...analyticsData,
        [stateProperty]: { ...analyticsData[stateProperty], data: eventsRes },
      });
      // if (!signal.aborted) {
      //   setAnalyticsData({
      //     ...analyticsData,
      //     [stateProperty]: {
      //       ...analyticsData[stateProperty],
      //       isLoading: false,
      //     },
      //   });
      // }
    } catch (error) {
      setAnalyticsData({
        ...analyticsData,
        [stateProperty]: {
          ...analyticsData[stateProperty],
          errorMessage: 'Error',
          isError: true,
        },
      });

      // if (!signal.aborted) {
      //   setAnalyticsData({
      //     ...analyticsData,
      //     [stateProperty]: {
      //       ...analyticsData[stateProperty],
      //       isLoading: false,
      //     },
      //   });
      // }
    }
  };

  return { analyticsData };
};
