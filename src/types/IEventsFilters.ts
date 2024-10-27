export interface IEventsFilters {
  fromDate?: Date | null;
  toDate?: Date | null;
  priority?: number[];
  freeText?: string;
  statuses?: number[];
  page: number;
  limit: number;
}
