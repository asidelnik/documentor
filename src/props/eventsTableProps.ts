import { EventsActionTitle } from '../enums/EventsActionTitle';
import { IEventAndCalcs } from '../types/IEvent';

export interface IEventsTableProps {
  rows: IEventAndCalcs[];
  eventsCount: number;
  getPageRows: (page: number, rowsPerPage: number) => void;
  openDialog: (actionTitle: EventsActionTitle, eventId?: string) => void;
}
