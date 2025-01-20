import { createContext, useContext, useReducer } from "react";
import { IAnalyticsFilters } from "../types/IAnalyticsFilters";
import { analyticsFiltersInitialState } from "../initial-state/analyticsFiltersInitialState";
import { AnalyticsFiltersActions, AnalyticsFiltersContextProviderProps } from "../types/AnalyticsFiltersContextTypes";

const AnalyticsFiltersContext = createContext<IAnalyticsFilters>(analyticsFiltersInitialState);
const AnalyticsFiltersDispatchContext = createContext<any>(null);

export function AnalyticsFiltersProvider({ children }: AnalyticsFiltersContextProviderProps) {
  const [state, dispatch] = useReducer(analyticsFiltersReducer, analyticsFiltersInitialState);

  return (
    <AnalyticsFiltersContext.Provider value={state}>
      <AnalyticsFiltersDispatchContext.Provider value={dispatch}>
        {children}
      </AnalyticsFiltersDispatchContext.Provider>
    </AnalyticsFiltersContext.Provider>
  );
}

function analyticsFiltersReducer(filters: IAnalyticsFilters, action: AnalyticsFiltersActions): any {
  switch (action.type) {
    case "update-from-date": {
      return { ...filters, fromDate: action.payload } as IAnalyticsFilters;
    }
    case "update-to-date": {
      return { ...filters, toDate: action.payload } as IAnalyticsFilters;
    }
    case "update-event-type-id": {
      return { ...filters, eventTypeId: action.payload } as IAnalyticsFilters;
    }
    case "update-latitude": {
      return { ...filters, latitude: action.payload } as IAnalyticsFilters;
    }
    case "update-longitude": {
      return { ...filters, longitude: action.payload } as IAnalyticsFilters;
    }
    case "update-radius": {
      return { ...filters, radius: action.payload } as IAnalyticsFilters;
    }
    default: {
      return filters;
    }
  }
}

export function useAnalyticsFilters() {
  return useContext(AnalyticsFiltersContext);
}

export function useAnalyticsFiltersDispatch() {
  return useContext(AnalyticsFiltersDispatchContext);
}