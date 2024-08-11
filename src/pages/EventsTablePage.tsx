import { useState, useEffect } from "react";
import { EventType, GetEventsResponse } from "../types/event";
import EventsTable from "../components/events-table/EventsTable";
import EventsAddEditDialog from "../components/events-add-edit-dialog/EventsAddEditDialog";
import { dateToString, secondsToTimeString } from "../utils/functions";
import { EventStatusEnum } from "../enums/event-status-enum";
import { serverRoutes } from "../server/server-routes";
import { EventsActionTitle } from "../enums/EventsActionTitle";
import { EventsDialog } from "../types/EventsDialog";
import { useEventsFilters } from "../contexts/events-filters-context";


export default function EventsTablePage() {
  const filters = useEventsFilters();
  // const filtersDispatch = useEventsFiltersDispatch();
  const [events, setEvents] = useState<EventType[]>([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dialog, setDialog] = useState<EventsDialog>({ isOpen: false, actionTitle: EventsActionTitle.Add, eventId: undefined });
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchData(1, 10);
  }, [filters.fromDate, filters.toDate, filters.priority, filters.freeText]);

  const fetchData = async (page: number, limit: number) => {
    try {
      const getEventsRequestString = serverRoutes.events.getFilteredEvents(filters);
      const response = await fetch(baseUrl + getEventsRequestString);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const eventsRes: GetEventsResponse = await response.json();
      let updatedEvents: EventType[] = [];
      if (eventsRes?.events?.length > 0) {
        updatedEvents = eventsRes.events.map((event: EventType) => {
          return {
            ...event,
            startTime: new Date(event.startTime),
            endTime: new Date(event.endTime),
            startTimeFormatted: dateToString(event.startTime),
            durationFormatted: secondsToTimeString(event.duration),
            statusFormatted: EventStatusEnum[event.status],
          };
        });
      }

      setEvents(updatedEvents);
      setEventsCount(eventsRes.eventsCount ?? 0);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage('error');
      setIsError(true);
      setIsLoading(false);
    }
  }

  const getPageRows = (page: number, limit: number) => {
    fetchData(page, limit);
  };

  const handleClickOpen = (actionTitle: EventsActionTitle, eventId?: number) => {
    setDialog({ isOpen: true, actionTitle, eventId });
  };

  const handleClose = () => {
    setDialog({ ...dialog, isOpen: false, eventId: undefined });
  };

  return (
    <>
      <EventsTable
        rows={events}
        eventsCount={eventsCount}
        getPageRows={getPageRows}
        openDialog={handleClickOpen}
      />
      <EventsAddEditDialog
        dialog={dialog}
        onClose={handleClose}
      />
    </>
  );
}