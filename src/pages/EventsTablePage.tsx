import EventsTable from "../components/events-table/EventsTable";
import EventsAddEditDialog from "../components/events-add-edit-dialog/EventsAddEditDialog";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useEventsDialog } from "../hooks/useEventsDialog";
import { useState } from "react";
import { ICustomSnackBar } from "../types/ICustomSnackBar";
import { SnackBarStatusEnum } from "../enums/SnackBarStatusEnum";
import { useQueryClient } from "@tanstack/react-query";
import CustomSnackBar from "../shared/components/snackbar/CustomSnackBar";

export default function EventsTablePage() {
  const [eventSubmitCount, setEventSubmitCount] = useState<number>(0);
  const { events, eventsCount, isLoading } = useFetchEvents(eventSubmitCount);
  const { dialog, handleOpen, handleClose } = useEventsDialog();
  const [snackBar, setSnackBar] = useState<ICustomSnackBar>({ isShow: false, status: SnackBarStatusEnum.Failure, message: '' });
  const queryClient = useQueryClient();

  function onEventSubmitted(isSuccess: boolean, message: string): void {
    if (isSuccess) {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ['badges'] });
      setEventSubmitCount(c => c + 1);
    }

    setSnackBar({
      isShow: true,
      status: isSuccess ? SnackBarStatusEnum.Success : SnackBarStatusEnum.Failure,
      message
    });
  }

  const closeSnackBar = () => setSnackBar({ ...snackBar, isShow: false });

  return (
    <>
      <EventsTable
        rows={events}
        eventsCount={eventsCount}
        isLoading={isLoading}
        openDialog={handleOpen}
      />

      {dialog.isOpen &&
        <EventsAddEditDialog
          dialog={dialog}
          onClose={handleClose}
        onSubmit={(isSuccess: boolean, message: string) => onEventSubmitted(isSuccess, message)}
        />
      }

      <CustomSnackBar snackBar={snackBar} closeSnackBar={closeSnackBar} />
    </>
  );
}