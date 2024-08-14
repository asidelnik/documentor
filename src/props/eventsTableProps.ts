import { EventsAction } from '../enums/EventsAction';
import { IEventAndCalcs } from '../types/IEvent';

export interface IEventsTableProps {
  rows: IEventAndCalcs[];
  eventsCount: number;
  openDialog: (eventsAction: EventsAction, eventId?: string) => void;
}
