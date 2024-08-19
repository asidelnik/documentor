import { serverRoutes } from '../../server/server-routes';
import { IEventForm } from '../../types/IEvent';

export const addEvent = async (data: IEventForm) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const requestPath = serverRoutes.events.addEvent;
  const response = await fetch(baseUrl + requestPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network add event error');
  }
  return response.json();
};
