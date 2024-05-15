import { EventsActionTitle } from '../enums/EventsActionTitle';
import { EventType } from '../types/event';

export interface IEventsTableProps {
  rows: EventType[];
  eventsCount: number;
  getPageRows: (page: number, rowsPerPage: number) => void;
  openDialog: (actionTitle: EventsActionTitle, eventId?: number) => void;
};
