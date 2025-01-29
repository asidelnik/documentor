import { serverRoutes } from '../../server/server-routes';

export const mutateVideosEvent = async ({
  eventId,
  videoIds,
}: IMutateVideosEventProps) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const requestPath: string = serverRoutes.events.addVideosToEvent(eventId);
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

export interface IMutateVideosEventProps {
  eventId: string;
  videoIds: Array<string>;
}
