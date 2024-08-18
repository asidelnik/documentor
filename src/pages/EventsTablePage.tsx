import EventsTable from "../components/events-table/EventsTable";
import EventsAddEditDialog from "../components/events-add-edit-dialog/EventsAddEditDialog";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useEventsDialog } from "../hooks/useEventsDialog";

export default function EventsTablePage() {
  const { events, eventsCount } = useFetchEvents();
  const { dialog, handleClickOpen, handleClose } = useEventsDialog();

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