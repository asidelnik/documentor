import { VideoStatusEnum } from '../constants/video-status';
import { IGetVideosFilters } from '../types/IGetVideosFilters';

export const filtersInitialState: IGetVideosFilters = {
  fromDate: '2023-10-01T00:00',
  toDate: '2023-10-27T00:00',
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
