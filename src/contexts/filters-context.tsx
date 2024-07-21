import { createContext, useContext, useReducer } from "react";
import { filtersInitialState } from "../initial-state/filtersInitialState";
import { IGetVideosFilters } from "../types/IGetVideosFilters";
import { FiltersActions, FiltersContextProviderProps } from "../types/FiltersContextTypes";

const FiltersContext = createContext<IGetVideosFilters>(filtersInitialState);
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

function filtersReducer(filters: IGetVideosFilters, action: FiltersActions): any {
  switch (action.type) {
    case "update-statuses": {
      return { ...filters, statuses: action.payload, } as IGetVideosFilters;
    }
    case "update-from-date": {
      return { ...filters, fromDate: action.payload, } as IGetVideosFilters;
    }
    case "update-to-date": {
      return { ...filters, toDate: action.payload, } as IGetVideosFilters;
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