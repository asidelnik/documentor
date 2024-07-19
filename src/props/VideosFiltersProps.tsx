import { GetVideosQueryParams } from "../types/getVideosQueryParams";

export interface VideosFiltersProps {
  defaultFilters: GetVideosQueryParams;
  fetchData: (filters: GetVideosQueryParams) => void;
}
