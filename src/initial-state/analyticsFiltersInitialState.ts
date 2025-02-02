import { IAnalyticsFilters } from '../types/IAnalyticsFilters';

export const analyticsFiltersInitialState: IAnalyticsFilters = {
  fromDate: null,
  toDate: null,
  eventTypeIds: undefined,
  lat: undefined,
  long: undefined,
  radius: undefined,
};
