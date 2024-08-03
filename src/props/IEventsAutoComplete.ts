import { IEventIdTitle } from '../types/IEventIdTitle';

export interface IEventsAutoComplete {
  isFetching: boolean;
  isPending: boolean;
  error: Error | null;
  events: IEventIdTitle[];
}
