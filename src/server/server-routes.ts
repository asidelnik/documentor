import { IGetEventsQueryParams } from '../types/getEventsQueryParams';
import { GetVideosQueryParams } from '../types/getVideosQueryParams';
import { getURLSearchParams } from '../utils/functions';

export const serverRoutes = {
  // All videos page
  getFilteredVideos: (params: GetVideosQueryParams) => {
    const paramsWithTags = {
      ...params,
      // tagsJoined: params.tags ? params.tags.join(',') : '',
    };
    const urlParams = getURLSearchParams(paramsWithTags);
    return `/videos?${urlParams}&_expand=event`;
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
