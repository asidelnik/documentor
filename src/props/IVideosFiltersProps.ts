import { GetVideosQueryParams } from '../types/getVideosQueryParams';

export interface IVideosFiltersProps {
  defaultFilters: GetVideosQueryParams;
  fetchData: (filters: GetVideosQueryParams) => void;
}
