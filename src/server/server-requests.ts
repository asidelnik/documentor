export const serverRequests = {
  // Need to check this server requests
  // All videos page
  getFilteredVideosWithEvent: '/videos?_expand=event',
  // Events page (table)
  getFilteredEvents: '/events',
  // Add/Edit event form & Event timeline
  getEventWithRelatedVideos: (eventId: number) =>
    `/events/` + eventId + `?_embed=videos`,
};
