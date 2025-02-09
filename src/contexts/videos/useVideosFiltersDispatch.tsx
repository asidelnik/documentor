import { useContext } from "react";
import { VideosFiltersDispatchContext } from "./VideosFiltersProvider";

export function useVideosFiltersDispatch() {
  return useContext(VideosFiltersDispatchContext);
}
