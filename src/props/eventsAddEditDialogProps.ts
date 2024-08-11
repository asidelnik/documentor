import { IEventsDialog } from '../types/IEventsDialog';

export interface EventsAddEditDialogProps {
  dialog: IEventsDialog;
  onClose: () => void;
}
