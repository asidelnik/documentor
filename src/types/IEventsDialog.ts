import { EventsAction } from '../enums/EventsAction';

export interface IEventsDialog {
  isOpen: boolean;
  eventsAction: EventsAction;
  eventId?: string;
}
