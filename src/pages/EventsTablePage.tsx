import { useState, useEffect } from "react";
import { EventType } from "../types/event";
import EventsTable from "../components/mui/events-table/EventsTable";
import { secondsToTimeString } from "../utils/functions";
import { EventStatusEnum } from "../enums/event-status-enum";
import { serverRoutes } from "../server/server-routes";


export default function EventsTablePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const baseUrl = 'http://localhost:3001';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getEventsRequestString = serverRoutes.getFilteredEvents({
          fromDate: '2023-10-01',
          toDate: '2023-10-27',
          lat: 32.0853,
          lon: 34.7818,
          radius: 10,
          status: 1,
          page: 1,
          limit: 3
          // tags: ['tag1', 'tag2'],
          // tagsJoined: ''
        });
        const filteredEventsRes = await fetch(baseUrl + getEventsRequestString);
        const filteredEvents = await filteredEventsRes.json();
        // const data = response?.data;
        if (filteredEvents) {
          filteredEvents.map((event: EventType) => {
            event.startTime = new Date(event.startTime);
            event.endTime = new Date(event.endTime);
            event.startTimeFormatted = event.startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            event.endTimeFormatted = event.endTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            event.durationFormatted = secondsToTimeString(event.duration);
            event.statusFormatted = EventStatusEnum[event.status];
          });
          setEvents(filteredEvents);
        }
        setIsLoading(false);
      } catch (error: any) {
        setErrorMessage(error.message)
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="temp-event-links">
        <EventsTable rows={events} />
      </div>
    </>
  );
}