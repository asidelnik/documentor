export interface IEventsFilters {
  fromDate?: Date;
  toDate?: Date;
  priority?: number[];
  freeText?: string;
  page?: number;
  limit?: number;
}
