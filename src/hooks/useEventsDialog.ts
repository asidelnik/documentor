import { useState } from 'react';
import { IEventsDialog } from '../types/IEventsDialog';
import { EventsAction } from '../enums/EventsAction';

export function useEventsDialog() {
  const [dialog, setDialog] = useState<IEventsDialog>({
    isOpen: false,
    eventsAction: EventsAction.Add,
  });
  const handleOpen = (eventsAction: EventsAction, eventId?: string) =>
    setDialog({ isOpen: true, eventsAction, eventId });

  const handleClose = () => {
    setDialog({ ...dialog, isOpen: false });
  };

  return { dialog, handleOpen, handleClose };
}
