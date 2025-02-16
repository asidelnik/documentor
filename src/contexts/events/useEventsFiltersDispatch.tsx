import { useContext } from "react";
import { EventsFiltersDispatchContext } from "./EventsFiltersProvider";


export function useEventsFiltersDispatch() {
  return useContext(EventsFiltersDispatchContext);
}
