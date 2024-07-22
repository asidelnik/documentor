export interface IGetVideosFilters {
  fromDate?: string;
  toDate?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  statuses?: number[];
  eventId?: boolean;
  page?: number;
  limit?: number;
  // id?: number;
}

// tags?: string[];
// tagsJoined: string;
