import { IEventBase, IEventAndDates } from '../../types/IEvent';
import { IVideo } from '../../types/IVideo';

export default async function fetchEventById(
  eventId: string
): Promise<IEventAndDates> {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    const response = await fetch(baseUrl + '/events/' + eventId);
    if (!response.ok) {
      throw new Error('Network error');
    }
    const data: IEventBase = await response.json();
    if (data) {
      const event: IEventAndDates = {
        ...data,
        startTimeDate: new Date(data.startTime),
        endTimeDate: new Date(data.endTime),
      };

      event.videos = event.videos.map((video: IVideo) => ({
        ...video,
        startTimeDate: new Date(video.startTime),
        endTimeDate: new Date(video.endTime),
      }));

      return event;
    }
    throw new Error('Data not found');
  } catch (error: any) {
    throw new Error(error.message);
  }
}
