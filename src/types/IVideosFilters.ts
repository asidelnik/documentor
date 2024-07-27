export interface IVideosFilters {
  fromDate?: Date;
  toDate?: Date;
  statuses?: number[];
  lat?: number;
  lng?: number;
  radius?: number;
  eventId?: boolean;
  page?: number;
  limit?: number;
  // id?: number;
}

// tags?: string[];
// tagsJoined: string;
