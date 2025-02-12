import { useEffect, useState } from 'react';
import { IEventBase, IEventAndDates } from '../types/IEvent';
import { IVideo } from '../types/IVideo';
import { serverRoutes } from '../server/server-routes';

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function useFetchEventById(eventId?: string) {
  const [event, setEvent] = useState<IEventAndDates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (eventId !== undefined) {
      fetchEvent(eventId);
    }

    async function fetchEvent(eventId: string) {
      try {
        setIsLoading(true);
        const response = await fetch(
          baseUrl + serverRoutes.events.fetchEvent(eventId)
        );
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

          setEvent(event);
          setIsLoading(false);
          setIsError(false);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
          setIsError(true);
          setIsLoading(false);
        }
      }
    }
  }, [eventId]);

  return { event, isLoading, isError, errorMessage };
}
