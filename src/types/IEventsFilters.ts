export interface IEventsFilters {
  fromDate?: Date | null;
  toDate?: Date | null;
  priority?: number[];
  freeText?: string;
  statuses?: number[];
  eventTypeIds?: Array<string>;
  lat?: number;
  long?: number;
  radius?: number;
  page: number;
  limit: number;
}
