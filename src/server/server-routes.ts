import { IGetEventsQueryParams } from '../types/getEventsQueryParams';
import { IVideosFilters } from '../types/IVideosFilters';
import { getURLSearchParams } from '../utils/functions';

export const serverRoutes = {
  // All videos page
  videos: {
    getFilteredVideos: (params: IVideosFilters) => {
      const urlParams = getURLSearchParams(params);
      return `/videos?${urlParams}`;
    },

    videoSetStatus: (videoId: string, status: number) => {
      return `/video-set-status/${videoId}?status=${status}`;
    },

    videoSetEvent: (
      videoId: string,
      newEventId: string | null,
      oldEventId: string | null
    ) => {
      return `/video-set-event/${videoId}?newEventId=${newEventId}&oldEventId=${oldEventId}`;
    },
  },
  events: {
    getEventsAutocomplete: '/events-autocomplete',

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
  },
};
