import { useState } from 'react';
import { IEvent, IEventAndDates } from '../types/IEvent';

export default function useFetchEvent() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [event, setEvent] = useState<IEventAndDates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchEvent = async (eventId: string) => {
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
        setEvent(event);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(error.message);
      setIsError(true);
      setIsLoading(false);
    }
  };

  return { event, fetchEvent };
}
