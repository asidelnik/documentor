import { IEventsFilters } from '../types/IEventsFilters';
import { IVideosFilters } from '../types/IVideosFilters';
import { getURLSearchParams } from '../utils/functions';

export const serverRoutes = {
  // All videos page
  videos: {
    getFilteredVideos: (params: IVideosFilters) => {
      const urlParams = getURLSearchParams(params);
      return `/videos/videos?${urlParams}`;
    },

    videoSetStatus: (videoId: string, status: number) => {
      return `/videos/video-set-status/${videoId}?status=${status}`;
    },

    videoSetEvent: (
      videoId: string,
      newEventId: string | null,
      oldEventId: string | null
    ) => {
      return `/videos/video-set-event/${videoId}?newEventId=${newEventId}&oldEventId=${oldEventId}`;
    },
    getFilteredVideosCount: (params: IVideosFilters) => {
      const urlParams = getURLSearchParams(params);
      return `/videos/videos-count?${urlParams}`;
    },
  },
  events: {
    getEventsAutocomplete: '/events/events-autocomplete',

    // Events page (table)
    getFilteredEvents: (params: IEventsFilters) => {
      const urlParams = getURLSearchParams(params);
      return `/events/events?${urlParams}`;
    },

    // Add/Edit event form & Event timeline
    getEventWithVideos: (eventId: number) =>
      `/events/events/` + eventId + `?_embed=videos`,

    addEvent: '/events/events',

    fetchEvent: (id: string) => `/events/events/${id}`,
    editEvent: (id: string) => `/events/events/${id}`,
  },
  others: {
    getHeaderBadgeCounts: '/shared/header-badges',
  },
};