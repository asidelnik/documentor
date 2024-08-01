import { VideoStatusEnum } from '../constants/video-status';
import { IVideosFilters } from '../types/IVideosFilters';

export const filtersInitialState: IVideosFilters = {
  fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), // 1 month ago
  toDate: new Date(), // Today
  lat: 32.0853,
  lng: 34.7818,
  radius: 10,
  statuses: [
    VideoStatusEnum.Unprocessed,
    VideoStatusEnum.Usable,
    VideoStatusEnum.Restricted,
  ],
  page: 1,
  limit: 100,
};
