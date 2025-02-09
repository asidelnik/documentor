import { useContext } from "react";
import { EventsFiltersContext } from "./EventsFiltersProvider";


export function useEventsFilters() {
  return useContext(EventsFiltersContext);
}
