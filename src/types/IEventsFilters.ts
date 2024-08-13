export interface IEventsFilters {
  fromDate?: Date;
  toDate?: Date;
  priority?: number[];
  freeText?: string;
  statuses?: number[];
  page: number;
  limit: number;
}
