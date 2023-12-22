export type GetVideosQueryParams = {
  fromDate?: string;
  toDate?: string;
  lat?: number;
  lon?: number;
  radius?: number;
  status?: number;
  eventId?: boolean;
  page?: number;
  limit?: number;

  // tags?: string[];
  // tagsJoined: string;
};
