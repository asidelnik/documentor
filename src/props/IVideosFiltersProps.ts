import { IGetVideosFilters } from '../types/IGetVideosFilters';

export interface IVideosFiltersProps {
  defaultFilters: IGetVideosFilters;
  fetchData: (filters: IGetVideosFilters) => void;
}
