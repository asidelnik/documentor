import { IEventsFilters } from '../types/IEventsFilters';
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
    getFilteredVideosCount: (params: IVideosFilters) => {
      const urlParams = getURLSearchParams(params);
      return `/videos-count?${urlParams}`;
    },
  },
  events: {
    getEventsAutocomplete: '/events-autocomplete',

    // Events page (table)
    getFilteredEvents: (params: IEventsFilters) => {
      const urlParams = getURLSearchParams(params);
      return `/events?${urlParams}`;
    },

    // Add/Edit event form & Event timeline
    getEventWithVideos: (eventId: number) =>
      `/events/` + eventId + `?_embed=videos`,

    addEvent: '/events',

    editEvent: (id: string) => `/events/${id}`,
  },
  others: {
    getHeaderBadgeCounts: '/header-badges',
  },
};
