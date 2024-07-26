import { createContext, useContext, useReducer } from "react";
import { filtersInitialState } from "../initial-state/filtersInitialState";
import { IVideosFilters } from "../types/IGetVideosFilters";
import { FiltersActions, FiltersContextProviderProps } from "../types/FiltersContextTypes";

const FiltersContext = createContext<IVideosFilters>(filtersInitialState);
const FiltersDispatchContext = createContext<any>(null);

export function FiltersProvider({ children }: FiltersContextProviderProps) {
  const [state, dispatch] = useReducer(filtersReducer, filtersInitialState);

  return (
    <FiltersContext.Provider value={state}>
      <FiltersDispatchContext.Provider value={dispatch}>
        {children}
      </FiltersDispatchContext.Provider>
    </FiltersContext.Provider>
  );
}

function filtersReducer(filters: IVideosFilters, action: FiltersActions): any {
  switch (action.type) {
    case "update-statuses": {
      return { ...filters, statuses: action.payload, } as IVideosFilters;
    }
    case "update-from-date": {
      return { ...filters, fromDate: action.payload, } as IVideosFilters;
    }
    case "update-to-date": {
      return { ...filters, toDate: action.payload, } as IVideosFilters;
    }
    default: {
      return filters;
    }
  }
}

export function useFilters() {
  return useContext(FiltersContext);
}

export function useFiltersDispatch() {
  return useContext(FiltersDispatchContext);
}