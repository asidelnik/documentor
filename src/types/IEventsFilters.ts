export interface IEventsFilters {
  fromDate?: Date | null;
  toDate?: Date | null;
  priority?: number[];
  freeText?: string;
  statuses?: number[];
  eventTypeIds?: Array<string>;
  page: number;
  limit: number;
}
