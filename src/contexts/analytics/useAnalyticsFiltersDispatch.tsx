import { useContext } from "react";
import { AnalyticsFiltersDispatchContext } from "./AnalyticsFiltersProvider";

export function useAnalyticsFiltersDispatch() {
  return useContext(AnalyticsFiltersDispatchContext);
}
