import { useState } from "react";
import EventsTable from "../components/events-table/EventsTable";
import EventsAddEditDialog from "../components/events-add-edit-dialog/EventsAddEditDialog";
import { EventsActionTitle } from "../enums/EventsActionTitle";
import { IEventsDialog } from "../types/IEventsDialog";
import { useFetchEvents } from "../hooks/useFetchEvents";

export default function EventsTablePage() {
  const { events, eventsCount } = useFetchEvents();
  const [dialog, setDialog] = useState<IEventsDialog>({ isOpen: false, actionTitle: EventsActionTitle.Add, eventId: undefined });

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