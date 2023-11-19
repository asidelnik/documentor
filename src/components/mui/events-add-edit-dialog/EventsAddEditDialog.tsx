import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { EventsAddEditDialogProps } from '../../../props/eventsAddEditDialogProps';
import { EventsActionTitle } from '../../../enums/EventsActionTitle';
import { Button, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';

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
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
