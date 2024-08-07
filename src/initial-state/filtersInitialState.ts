import { VideoStatusEnum } from '../constants/video-status';
import { IVideosFilters } from '../types/IVideosFilters';

export const filtersInitialState: IVideosFilters = {
  fromDate: new Date('2023-10-01T00:00'), // For debugging
  toDate: new Date('2023-10-27T00:00'), // For debugging
  //// Location filtering
  // lat: 32.0853,
  // lng: 34.7818,
  // radius: 10,
  statuses: [
    VideoStatusEnum.Unprocessed,
    VideoStatusEnum.Usable,
    VideoStatusEnum.Restricted,
  ],
  page: 1,
  limit: 100,
};
