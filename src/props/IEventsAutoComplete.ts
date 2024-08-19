import { IOptionStr } from '../types/IOptionStr';

export interface IEventsAutoComplete {
  isFetching: boolean;
  isPending: boolean;
  error: Error | null;
  events: IOptionStr[];
}
