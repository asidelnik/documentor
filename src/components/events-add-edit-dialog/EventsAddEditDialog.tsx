import { useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, DialogContent, IconButton } from '@mui/material';
import { IEventsAddEditDialogProps } from '../../props/IEventsAddEditDialogProps';
import EventEditForm from '../event-form/EventEditForm';
import EventAddForm from '../event-form/EventAddForm';
import useFetchEventById from '../../hooks/useFetchEventById';
import { EventsAction } from '../../enums/EventsAction';

export default function EventsAddEditDialog({ dialog, onClose, onSubmit }: IEventsAddEditDialogProps) {
  const dialogTitle = dialog.eventsAction === EventsAction.Add ? 'Add event' : 'Edit event';
  const { event, fetchEvent, isLoading } = useFetchEventById();

  useEffect(() => {
    if (dialog.eventId) {
      fetchEvent(dialog.eventId);
    }
  }, [dialog.eventId]);

  return (
    <Dialog
      onClose={onClose}
      open={dialog.isOpen}
      fullWidth
      maxWidth='xl'
      aria-labelledby="add-edit-event-dialog"
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {dialog.eventsAction === EventsAction.Edit && isLoading &&
          <div className='event-dialog-progress-container'><CircularProgress /></div>
        }
        {dialog.eventsAction === EventsAction.Add &&
          <EventAddForm
            onSubmit={(isSuccess: boolean, message: string) => onSubmit(isSuccess, message)}
          />}
        {dialog.eventsAction === EventsAction.Edit && !isLoading && event &&
          <EventEditForm
            eventToEdit={event}
          eventId={dialog.eventId}
            onSubmit={(isSuccess: boolean, message: string) => onSubmit(isSuccess, message)}
          />
        }
      </DialogContent>
    </Dialog>
  );
}
