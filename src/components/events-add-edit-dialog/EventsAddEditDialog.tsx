import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { EventsAddEditDialogProps } from '../../../props/eventsAddEditDialogProps';
import { EventsActionTitle } from '../../../enums/EventsActionTitle';
import { Button, DialogActions, DialogContent, IconButton } from '@mui/material';
import EventForm from '../../event-form/EventForm';

export default function EventsAddEditDialog({ dialog, onClose }: EventsAddEditDialogProps) {
  const title = dialog.actionTitle === EventsActionTitle.Add ? 'Add event' : 'Edit event';

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullScreen
      onClose={handleClose}
      open={dialog.isOpen}
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
        <EventForm eventId={dialog.eventId} />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
