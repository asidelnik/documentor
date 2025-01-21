import { IFetchState } from '../types/IAnalytics';

export const analyticsFetchInitialState: IFetchState = {
  recentEvents: {
    data: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
  },
  eventsCountPerType: {
    data: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
  },
  dangerousCities: {
    data: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
  },
  eventsFrequencyOverTime: {
    data: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
  },
};
