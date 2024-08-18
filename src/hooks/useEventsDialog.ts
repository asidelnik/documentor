import { useState } from 'react';
import { IEventsDialog } from '../types/IEventsDialog';
import { EventsAction } from '../enums/EventsAction';
import fetchEventById from '../query/fetchEventById';

export function useEventsDialog() {
  const [dialog, setDialog] = useState<IEventsDialog>({
    isOpen: false,
    eventsAction: EventsAction.Add,
    event: null,
  });

  const handleClickOpen = async (
    eventsAction: EventsAction,
    eventId?: string
  ) => {
    let event = null;
    if (eventId) {
      event = await fetchEventById(eventId);
      setDialog({ isOpen: true, eventsAction, event });
    } else {
      setDialog({ isOpen: true, eventsAction, event });
    }
  };

  const handleClose = () => {
    setDialog({ ...dialog, isOpen: false, event: null });
  };

  return { dialog, handleClickOpen, handleClose };
}
