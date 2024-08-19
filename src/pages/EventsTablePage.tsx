import EventsTable from "../components/events-table/EventsTable";
import EventsAddEditDialog from "../components/events-add-edit-dialog/EventsAddEditDialog";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useEventsDialog } from "../hooks/useEventsDialog";
import { useState } from "react";
import { IFormSubmissionResult } from "../types/IFormSubmissionResult";
import { Snackbar } from "@mui/material";
import { SubmissionStatusEnum } from "../enums/SubmissionStatusEnum";

export default function EventsTablePage() {
  const { events, eventsCount } = useFetchEvents();
  const { dialog, handleClickOpen, handleClose } = useEventsDialog();
  const [snackBar, setSnackBar] = useState<IFormSubmissionResult>({ isShow: false, submissionStatus: undefined, message: '' });

  function onSubmitHandler(isSuccess: boolean, message: string): void {
    if (isSuccess) handleClose();
    setSnackBar({
      isShow: true,
      submissionStatus: isSuccess ? SubmissionStatusEnum.Success : SubmissionStatusEnum.Failure,
      message
    });
  }

  function closeSnackBar() {
    setSnackBar({ ...snackBar, isShow: false });
  }

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
        onSubmit={(isSuccess: boolean, message: string) => onSubmitHandler(isSuccess, message)}
      />

      <Snackbar
        open={snackBar.isShow}
        ContentProps={{
          sx: {
            backgroundColor: snackBar.submissionStatus === SubmissionStatusEnum.Success ? "hsl(115deg 100% 33%)" : "hsl(0deg 98% 40%)",
            border: 'none',
            fontWeight: 'bold',
            color: 'white'
          },
        }}
        message={snackBar.message}
        onClose={closeSnackBar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={5000}
        color={snackBar.submissionStatus === SubmissionStatusEnum.Success ? 'success' :
          snackBar.submissionStatus === SubmissionStatusEnum.Failure ? 'failure' : ''}
      />
    </>
  );
}