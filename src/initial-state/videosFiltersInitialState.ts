import { VideoStatusEnum } from '../constants/video-status';
import { IVideosFilters } from '../types/IVideosFilters';

export const videosFiltersInitialState: IVideosFilters = {
  fromDate: new Date('2023-10-01T00:00'), // For debugging
  toDate: new Date('2023-10-27T00:00'), // For debugging
  statuses: [
    VideoStatusEnum.Unprocessed,
    VideoStatusEnum.Usable,
    VideoStatusEnum.Restricted,
  ],
  eventId: undefined,
  page: 1,
  limit: 100,
};

//// Location filtering
// lat: 32.0853,
// lng: 34.7818,
// radius: 10,
