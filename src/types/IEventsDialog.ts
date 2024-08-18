import { EventsAction } from '../enums/EventsAction';
import { IEventAndDates } from './IEvent';

export interface IEventsDialog {
  isOpen: boolean;
  eventsAction: EventsAction;
  event: IEventAndDates | null;
}
