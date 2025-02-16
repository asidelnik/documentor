import { useContext } from "react";
import { AnalyticsFiltersContext } from "./AnalyticsFiltersProvider";

export function useAnalyticsFilters() {
  return useContext(AnalyticsFiltersContext);
}



