import { useState, useEffect, useRef } from "react";
import { IEvent, IEventAndCalcs, IEventsAndCount } from "../types/IEvent";
import EventsTable from "../components/events-table/EventsTable";
import EventsAddEditDialog from "../components/events-add-edit-dialog/EventsAddEditDialog";
import { dateToString, secondsToTimeString } from "../utils/functions";
import { EventStatusEnum } from "../enums/event-status-enum";
import { serverRoutes } from "../server/server-routes";
import { EventsActionTitle } from "../enums/EventsActionTitle";
import { IEventsDialog } from "../types/IEventsDialog";
import { useEventsFilters } from "../contexts/events-filters-context";
import { eventPrioirtyLabels } from "../constants/event-constants";

export default function EventsTablePage() {
  const filters = useEventsFilters();
  const [events, setEvents] = useState<IEventAndCalcs[]>([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dialog, setDialog] = useState<IEventsDialog>({ isOpen: false, actionTitle: EventsActionTitle.Add, eventId: undefined });
  const baseUrl = import.meta.env.VITE_BASE_URL;
  let fetchController = new AbortController();

  useEffect(() => {
    fetchData();
    return () => fetchController.abort()
  }, [filters]);

  const fetchData = async () => {
    fetchController.abort('Newer fetch called');
    fetchController = new AbortController();
    const { signal } = fetchController;
    try {
      const eventsFetchPath = serverRoutes.events.getFilteredEvents(filters);
      const response = await fetch(baseUrl + eventsFetchPath, { signal });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const eventsRes: IEventsAndCount = await response.json();
      let updatedEvents: IEventAndCalcs[] = [];
      if (eventsRes?.events?.length > 0) {
        updatedEvents = eventsRes.events.map((event: IEvent) => {
          return {
            ...event,
            startTimeDate: new Date(event.startTime),
            endTimeDate: new Date(event.endTime),
            startTimeFormatted: dateToString(new Date(event.startTime)),
            durationFormatted: secondsToTimeString(event.duration),
            statusFormatted: EventStatusEnum[event.status],
            priorityFormatted: eventPrioirtyLabels[event.priority]
          };
        }) as IEventAndCalcs[];
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

  const handleClickOpen = (actionTitle: EventsActionTitle, eventId?: string) => {
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
        openDialog={handleClickOpen}
      />
      <EventsAddEditDialog
        dialog={dialog}
        onClose={handleClose}
      />
    </>
  );
}