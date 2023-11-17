export type GetEventsQueryParams = {
  fromDate?: string;
  toDate?: string;
  lat?: number;
  lon?: number;
  radius?: number;
  status?: number;
  page?: number;
  limit?: number;
  // tags?: string[];
  // tagsJoined: string;
};
