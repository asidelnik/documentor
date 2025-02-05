export interface IVideosFilters {
  fromDate?: Date | null;
  toDate?: Date | null;
  statuses?: number[];
  eventId?: string;
  lat?: number;
  long?: number;
  radius?: number;
  page: number;
  limit: number;
}