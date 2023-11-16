import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EventType } from "../types/event";


export default function EventsTablePage() {
  const [events, setEvents] = useState<EventType[] | undefined>(undefined);
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
        <ul>
          {events && events.map((event: EventType, index: number) => (
            <li key={index}>
              <Link to={`/events/${event.id}`}>{event.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}