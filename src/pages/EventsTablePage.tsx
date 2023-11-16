import { useState, useEffect } from "react";
import axios from "axios";
import { EventType } from "../types/event";
import EventsTable from "../components/mui/events-table/EventsTable";
import { secondsToTimeString } from "../utils/functions";
import { EventStatusEnum } from "../enums/event-status-enum";


export default function EventsTablePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const axiosFetchData = async () => {
      try {
        const url = `http://localhost:3000/events`;
        const response = await axios.get(url);
        const data = response?.data;
        if (data) {
          data.map((event: EventType) => {
            event.startTime = new Date(event.startTime);
            event.endTime = new Date(event.endTime);
            event.startTimeFormatted = event.startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            event.endTimeFormatted = event.endTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            event.durationFormatted = secondsToTimeString(event.duration);
            event.statusFormatted = EventStatusEnum[event.status];
          });
          setEvents(data);
        }
        setIsLoading(false);
      } catch (error: any) {
        setErrorMessage(error.message)
        setIsError(true);
        setIsLoading(false);
      }
    };
    axiosFetchData();
  }, []);

  return (
    <>
      <div className="temp-event-links">
        <EventsTable rows={events} />
      </div>
    </>
  );
}