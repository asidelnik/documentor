import { EventsAction } from '../enums/EventsAction';
import { IEventAndDates } from '../types/IEvent';

export interface IEventFormProps {
  eventsAction: EventsAction;
  eventToEdit: IEventAndDates | null;
  onSubmit: (isSuccess: boolean, message: string) => void;
}
