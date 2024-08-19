import { IEvent, IEventAndDates } from '../../types/IEvent';

export default async function fetchEventById(
  eventId: string
): Promise<IEventAndDates> {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    const response = await fetch(baseUrl + '/events/' + eventId);
    if (!response.ok) {
      throw new Error('Network error');
    }
    const data: IEvent = await response.json();
    if (data) {
      const event: IEventAndDates = {
        ...data,
        startTimeDate: new Date(data.startTime),
        endTimeDate: new Date(data.endTime),
      };
      return event;
    }
    throw new Error('Data not found');
  } catch (error: any) {
    throw new Error(error.message);
  }
}
