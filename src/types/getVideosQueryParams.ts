export type GetVideosQueryParams = {
  fromDate?: string;
  toDate?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  status?: number;
  eventId?: boolean;
  page?: number;
  limit?: number;

  // tags?: string[];
  // tagsJoined: string;
};
