import { serverRoutes } from '../../server/server-routes';
import { IEventEditForm } from '../../types/IEvent';

export const editEvent = async (data: IEventEditForm, id: string) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const requestPath = serverRoutes.events.editEvent(id);
  const response = await fetch(baseUrl + requestPath, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network edit event error');
  }
  return response.json();
};
