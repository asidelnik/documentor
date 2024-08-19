import { serverRoutes } from '../../server/server-routes';
import { IEventForm } from '../../types/IEvent';

export const addEvent = async (data: IEventForm) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    const requestPath = serverRoutes.events.addEvent;
    const response = await fetch(baseUrl + requestPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Event submitted successfully.');
    } else {
      console.error('Event submission failure.');
    }
  } catch (error) {
    console.error('Event submission failure:', error);
  }
};
