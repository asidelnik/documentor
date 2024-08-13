import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { Button, DialogActions, DialogContent, IconButton } from '@mui/material';
import { EventsAddEditDialogProps } from '../../props/eventsAddEditDialogProps';
import { EventsActionTitle } from '../../enums/EventsActionTitle';
import EventForm from '../event-form/EventForm';

export default function EventsAddEditDialog({ dialog, onClose }: EventsAddEditDialogProps) {
  const title = dialog.actionTitle === EventsActionTitle.Add ? 'Add event' : 'Edit event';

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={dialog.isOpen}
      fullWidth
      maxWidth='xl'
      aria-labelledby="add-edit-event-dialog"
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
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
        <EventForm eventId={dialog.eventId} actionTitle={dialog.actionTitle} />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
