export interface IAnalyticsFilters {
  eventTypeId?: string;
  fromDate?: Date | null;
  toDate?: Date | null;
  lat?: number;
  long?: number;
  radius?: number;
}
