export const serverRequests = {
  // Need to check this server requests
  // All videos page
  getFilteredVideosWithEvent: (pageNumber: number, limitNumber: number) =>
    `/videos?_expand=event&_page=` + pageNumber + `&_limit=` + limitNumber,
  // Events page (table)
  getFilteredEvents: (pageNumber: number, limitNumber: number) =>
    `/events?_page=` + pageNumber + `&_limit=` + limitNumber,
  // Add/Edit event form & Event timeline
  getEventWithRelatedVideos: (eventId: number) =>
    `/events/` + eventId + `?_embed=videos`,
};