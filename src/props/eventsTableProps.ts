import { EventsActionTitle } from '../enums/EventsActionTitle';
import { IEventAndCalcs } from '../types/IEvent';

export interface IEventsTableProps {
  rows: IEventAndCalcs[];
  eventsCount: number;
  openDialog: (actionTitle: EventsActionTitle, eventId?: string) => void;
}
