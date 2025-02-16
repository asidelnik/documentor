import { EventsAction } from '../enums/EventsAction';
import { IEventAndCalcsForTable } from '../types/IEvent';

export interface IEventsTableProps {
  rows: IEventAndCalcsForTable[];
  eventsCount: number;
  isLoading: boolean;
  openDialog: (eventsAction: EventsAction, eventId?: string) => void;
}
