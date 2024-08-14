import { useState } from "react";
import EventsTable from "../components/events-table/EventsTable";
import EventsAddEditDialog from "../components/events-add-edit-dialog/EventsAddEditDialog";
import { EventsAction } from "../enums/EventsAction";
import { IEventsDialog } from "../types/IEventsDialog";
import { useFetchEvents } from "../hooks/useFetchEvents";

export default function EventsTablePage() {
  const { events, eventsCount } = useFetchEvents();
  const [dialog, setDialog] = useState<IEventsDialog>({ isOpen: false, eventsAction: EventsAction.Add, eventId: undefined });

  const handleClickOpen = (eventsAction: EventsAction, eventId?: string) => {
    setDialog({ isOpen: true, eventsAction, eventId });
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