import { IAnalyticsFilters } from '../types/IAnalyticsFilters';

export const analyticsFiltersInitialState: IAnalyticsFilters = {
  fromDate: null,
  toDate: null,
  eventTypeId: undefined,
  lat: undefined,
  long: undefined,
  radius: undefined,
};
