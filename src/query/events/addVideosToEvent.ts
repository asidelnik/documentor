import { serverRoutes } from '../../server/server-routes';

export const addVideosToEvent = async (
  eventId: string,
  videoIds: Array<string>
) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const requestPath = serverRoutes.events.addVideosToEvent(eventId);
  const response = await fetch(baseUrl + requestPath, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(videoIds),
  });

  if (!response.ok) {
    throw new Error('Network error at "add videos to event".');
  }
  return response.json();
};
