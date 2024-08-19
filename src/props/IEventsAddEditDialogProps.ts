import { IEventsDialog } from '../types/IEventsDialog';

export interface IEventsAddEditDialogProps {
  dialog: IEventsDialog;
  onClose: () => void;
  onSubmit: (isSuccess: boolean, message: string) => void;
}
