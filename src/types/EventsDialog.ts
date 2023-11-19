import { EventsActionTitle } from '../enums/EventsActionTitle';

export interface EventsDialog {
  isOpen: boolean;
  actionTitle: EventsActionTitle;
  eventId?: number;
}
