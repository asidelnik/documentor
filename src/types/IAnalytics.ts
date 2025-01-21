import { EventTypeEnum } from '../constants/event-constants';

export interface IRecentEvent {
  title: string;
  startTime: Date;
  address: string;
  city: string;
  types: Array<EventTypeEnum>;
}

export interface IEventsCountPerType {
  type: EventTypeEnum;
  count: number;
}

export interface IDangerousCity {
  cityName: string;
  eventsCount: number;
}

export interface IEventsFrequencyOverTime {
  monthName: string;
  eventsCount: number;
}

export interface IFetchStateBase {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

interface IFetchStateT<T> extends IFetchStateBase {
  data: Array<T>;
}

export interface IFetchState {
  recentEvents: IFetchStateT<IRecentEvent>;
  eventsCountPerType: IFetchStateT<IEventsCountPerType>;
  dangerousCities: IFetchStateT<IDangerousCity>;
  eventsFrequencyOverTime: IFetchStateT<IEventsFrequencyOverTime>;
}
