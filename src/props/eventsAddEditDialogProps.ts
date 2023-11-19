import { EventsActionTitle } from '../enums/EventsActionTitle';

interface DialogOpenType {
  isOpen: boolean;
  actionTitle: EventsActionTitle;
}

export interface EventsAddEditDialogProps {
  dialog: DialogOpenType;
  onClose: () => void;
}
