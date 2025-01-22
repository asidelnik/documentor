import { ILocationTexts } from './ILocation';

export interface IRecentEvent {
  _id: string;
  title: string;
  startTime: string;
  locationTexts: ILocationTexts;
  types: Array<string>;
}

export interface IEventsCountPerType {
  type: string;
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
