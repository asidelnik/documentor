import { createContext, useContext, useReducer } from "react";
import { IEventsFilters } from "../types/IEventsFilters";
import { eventsFiltersInitialState } from "../initial-state/eventsFiltersInitialState";
import { EventsFiltersActions, EventsFiltersContextProviderProps } from "../types/EventsFiltersContextTypes";

const EventsFiltersContext = createContext<IEventsFilters>(eventsFiltersInitialState);
const EventsFiltersDispatchContext = createContext<any>(null);

export function EventsFiltersProvider({ children }: EventsFiltersContextProviderProps) {
  const [state, dispatch] = useReducer(filtersReducer, eventsFiltersInitialState);

  return (
    <EventsFiltersContext.Provider value={state}>
      <EventsFiltersDispatchContext.Provider value={dispatch}>
        {children}
      </EventsFiltersDispatchContext.Provider>
    </EventsFiltersContext.Provider>
  );
}

function filtersReducer(filters: IEventsFilters, action: EventsFiltersActions): any {
  switch (action.type) {
    case "update-from-date": {
      return { ...filters, fromDate: action.payload, page: 1 } as IEventsFilters;
    }
    case "update-to-date": {
      return { ...filters, toDate: action.payload, page: 1 } as IEventsFilters;
    }
    case "update-priority": {
      return { ...filters, priority: action.payload, page: 1 } as IEventsFilters;
    }
    case "update-free-text": {
      return { ...filters, freeText: action.payload, page: 1 } as IEventsFilters;
    }
    case "update-status": {
      return { ...filters, statuses: action.payload, page: 1 } as IEventsFilters;
    }
    case "update-limit": {
      return { ...filters, limit: action.payload, page: 1 } as IEventsFilters;
    }
    case "update-page": {
      return { ...filters, page: action.payload, } as IEventsFilters;
    }
    default: {
      return filters;
    }
  }
}

export function useEventsFilters() {
  return useContext(EventsFiltersContext);
}

export function useEventsFiltersDispatch() {
  return useContext(EventsFiltersDispatchContext);
}