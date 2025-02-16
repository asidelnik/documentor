import { useContext } from "react";
import { VideosFiltersContext } from "./VideosFiltersProvider";

export function useVideosFilters() {
  return useContext(VideosFiltersContext);
}