import { createContext, useReducer } from "react";
import { videosFiltersInitialState } from "../../initial-state/videosFiltersInitialState";
import { IVideosFilters } from "../../types/IVideosFilters";
import { VideosFiltersActions, VideosFiltersContextProviderProps } from "./VideosFiltersContextTypes";

export const VideosFiltersContext = createContext<IVideosFilters>(videosFiltersInitialState);
export const VideosFiltersDispatchContext = createContext<any>(null);//Dispatch<VideosFiltersActions> | null>(null);

export function VideosFiltersProvider({ children }: VideosFiltersContextProviderProps) {
  const [state, dispatch] = useReducer(videosFiltersReducer, videosFiltersInitialState);

  return (
    <VideosFiltersContext.Provider value={state}>
      <VideosFiltersDispatchContext.Provider value={dispatch}>
        {children}
      </VideosFiltersDispatchContext.Provider>
    </VideosFiltersContext.Provider>
  );
}

function videosFiltersReducer(filters: IVideosFilters, action: VideosFiltersActions): IVideosFilters {
  switch (action.type) {
    case 'update-statuses': {
      return { ...filters, statuses: action.payload, page: 1 } as IVideosFilters;
    }
    case 'update-from-date': {
      return { ...filters, fromDate: action.payload, page: 1 } as IVideosFilters;
    }
    case 'update-to-date': {
      return { ...filters, toDate: action.payload, page: 1 } as IVideosFilters;
    }
    case 'update-event-id': {
      return { ...filters, eventId: action.payload, page: 1 } as IVideosFilters;
    }
    case "update-latitude": {
      return { ...filters, lat: action.payload, page: 1 } as IVideosFilters;
    }
    case "update-longitude": {
      return { ...filters, long: action.payload, page: 1 } as IVideosFilters;
    }
    case "update-lng-lat": {
      return { ...filters, lat: action.payload.lat, long: action.payload.lng, radius: action.payload.radius, page: 1 } as IVideosFilters;
    }
    case "update-radius": {
      return { ...filters, radius: action.payload, page: 1 } as IVideosFilters;
    }
    case "update-limit": {
      return { ...filters, limit: action.payload, page: 1 } as IVideosFilters;
    }
    case "update-page": {
      return { ...filters, page: action.payload, } as IVideosFilters;
    }
    default: {
      return filters;
    }
  }
}


