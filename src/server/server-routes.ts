import { IGetEventsQueryParams } from '../types/getEventsQueryParams';
import { IVideosFilters } from '../types/IGetVideosFilters';
import { getURLSearchParams } from '../utils/functions';

export const serverRoutes = {
  // All videos page
  getFilteredVideos: (params: IVideosFilters) => {
    const urlParams = getURLSearchParams(params);
    return `/videos?${urlParams}&_expand=event`;
  },

  updateVideoStatus: (videoId: number, status: number) => {
    return `/videos/${videoId}?status=${status}`;
  },

  // Events page (table)
  getFilteredEvents: (params: IGetEventsQueryParams) => {
    // const paramsWithTags = {
    //   ...params,
    //   // tagsJoined: params.tags ? params.tags.join(',') : '',
    // };
    const urlParams = getURLSearchParams(params);
    return `/events?${urlParams}`;
  },

  // Add/Edit event form & Event timeline
  getEventWithVideos: (eventId: number) =>
    `/events/` + eventId + `?_embed=videos`,
};
