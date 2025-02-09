import { createContext, useReducer } from "react";
import { IEventsFilters } from "../../types/IEventsFilters";
import { eventsFiltersInitialState } from "../../initial-state/eventsFiltersInitialState";
import { EventsFiltersActions, EventsFiltersContextProviderProps } from "./EventsFiltersContextTypes";

export const EventsFiltersContext = createContext<IEventsFilters>(eventsFiltersInitialState);
export const EventsFiltersDispatchContext = createContext<any>(null);

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

function filtersReducer(filters: IEventsFilters, action: EventsFiltersActions): IEventsFilters {
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
    case "update-event-type-ids": {
      return { ...filters, eventTypeIds: action.payload, page: 1 } as IEventsFilters;
    }
    case "update-latitude": {
      return { ...filters, lat: action.payload, page: 1 } as IEventsFilters;
    }
    case "update-longitude": {
      return { ...filters, long: action.payload, page: 1 } as IEventsFilters;
    }
    case "update-lng-lat": {
      return { ...filters, lat: action.payload.lat, long: action.payload.lng, radius: action.payload.radius, page: 1 } as IEventsFilters;
    }
    case "update-radius": {
      return { ...filters, radius: action.payload, page: 1 } as IEventsFilters;
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

