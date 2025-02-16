export interface IAnalyticsFilters {
  eventTypeIds?: Array<string>;
  fromDate?: Date | null;
  toDate?: Date | null;
  lat?: number;
  long?: number;
  radius?: number;
}
