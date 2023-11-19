import { useState, useEffect } from "react";
import { EventType } from "../types/event";
import EventsTable from "../components/mui/events-table/EventsTable";
import { dateToString, secondsToTimeString } from "../utils/functions";
import { EventStatusEnum } from "../enums/event-status-enum";
import { serverRoutes } from "../server/server-routes";


export default function EventsTablePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const baseUrl = 'http://localhost:3002';

  useEffect(() => {
    fetchData(1, 10);
  }, []);

  const fetchData = async (page: number, limit: number) => {
    try {
      // const pageString = 'a';
      const getEventsRequestString = serverRoutes.getFilteredEvents({
        fromDate: '2023-10-01',
        toDate: '2023-10-27',
        lat: 32.0853,
        lon: 34.7818,
        radius: 10,
        status: 2,
        page,
        limit
        // tags: ['tag1', 'tag2'],
        // tagsJoined: ''
      });
      const response = await fetch(baseUrl + getEventsRequestString);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const filteredEvents = await response.json();
      if (filteredEvents && filteredEvents.events) {
        filteredEvents.events.map((event: EventType) => {
          event.startTime = new Date(event.startTime);
          event.endTime = new Date(event.endTime);
          event.startTimeFormatted = dateToString(event.startTime);
          event.durationFormatted = secondsToTimeString(event.duration);
          event.statusFormatted = EventStatusEnum[event.status];
        });
        setEvents(filteredEvents.events);
        setEventsCount(filteredEvents.eventsCount);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage('error');
      setIsError(true);
      setIsLoading(false);
    }
  }

  const getPageRows = (page: number, limit: number) => {
    fetchData(page, limit);
  };

  return (
    <>
      <div className="temp-event-links">
        <EventsTable rows={events} eventsCount={eventsCount} getPageRows={getPageRows} />
      </div>
    </>
  );
}