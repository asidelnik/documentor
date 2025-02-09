import { useState, useEffect } from 'react';
import {
  IEventBase,
  IEventAndCalcsForTable,
  IEventsAndCount,
} from '../types/IEvent';
import { dateToString, secondsToDurationString } from '../utils/functions';
import { serverRoutes } from '../server/server-routes';
import { useEventsFilters } from '../contexts/events/useEventsFilters';
import { eventPriorityLabels } from '../constants/event-constants';

export const useFetchEvents = () => {
  const filters = useEventsFilters();
  const [events, setEvents] = useState<IEventAndCalcsForTable[]>([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL;
  let fetchController = new AbortController();

  useEffect(() => {
    fetchData();
    return () => fetchController.abort();
  }, [filters]);

  const fetchData = async () => {
    fetchController.abort('Newer fetch called');
    fetchController = new AbortController();
    const { signal } = fetchController;
    try {
      setIsLoading(true);
      const path = serverRoutes.events.getFilteredEvents(filters);
      const response = await fetch(baseUrl + path, { signal });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const eventsRes: IEventsAndCount = await response.json();
      let updatedEvents: IEventAndCalcsForTable[] = [];
      if (eventsRes?.events?.length > 0) {
        updatedEvents = eventsRes.events.map((event: IEventBase) => {
          return {
            ...event,
            startTimeFormatted: dateToString(new Date(event.startTime)),
            durationFormatted: secondsToDurationString(event.duration),
            priorityFormatted: eventPriorityLabels[event.priority],
          };
        }) as IEventAndCalcsForTable[];
      }
      setEvents(updatedEvents);
      setEventsCount(eventsRes.eventsCount ?? 0);
      if (!signal.aborted) {
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage('Error');
      setIsError(true);
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  return { events, eventsCount, isLoading, isError, errorMessage, fetchData };
};
