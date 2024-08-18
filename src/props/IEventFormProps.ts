import { EventsAction } from '../enums/EventsAction';
import { IEventAndDates } from '../types/IEvent';

export interface IEventFormProps {
  eventsAction: EventsAction;
  eventToEdit: IEventAndDates | null;
}
