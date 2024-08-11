import { EventsActionTitle } from '../enums/EventsActionTitle';

export interface IEventsDialog {
  isOpen: boolean;
  actionTitle: EventsActionTitle;
  eventId?: string;
}
