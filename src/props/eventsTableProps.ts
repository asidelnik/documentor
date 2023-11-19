import { EventsActionTitle } from '../enums/EventsActionTitle';
import { EventType } from '../types/event';

export type EventsTableProps = {
  rows: EventType[];
  eventsCount: number;
  getPageRows: (page: number, rowsPerPage: number) => void;
  openDialog: (actionTitle: EventsActionTitle) => void;
};
