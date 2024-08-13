import { serverRoutes } from "../server/server-routes";
import { IOptionStr } from "../types/IOptionStr";

export const fetchEventsAutocomplete = async (signal: AbortSignal): Promise<IOptionStr[]> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const path = serverRoutes.events.getEventsAutocomplete;
  const response = await fetch(baseUrl + path, { signal });
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};