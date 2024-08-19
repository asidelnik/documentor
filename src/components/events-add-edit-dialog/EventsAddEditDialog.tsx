import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, IconButton } from '@mui/material';
import { IEventsAddEditDialogProps } from '../../props/IEventsAddEditDialogProps';
import { EventsAction } from '../../enums/EventsAction';
import EventForm from '../event-form/EventForm';

export default function EventsAddEditDialog({ dialog, onClose, onSubmit }: IEventsAddEditDialogProps) {
  const dialogTitle = dialog.eventsAction === EventsAction.Add ? 'Add event' : 'Edit event';

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
        <EventForm
          eventsAction={dialog.eventsAction}
          eventToEdit={dialog.event}
          onSubmit={(isSuccess: boolean, message: string) => onSubmit(isSuccess, message)}
        />
      </DialogContent>
    </Dialog>
  );
}
