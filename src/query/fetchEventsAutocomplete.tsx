import { serverRoutes } from "../server/server-routes";
import { IEventIdTitle } from "../types/IEventIdTitle";

export const fetchEventsAutocomplete = async (signal: AbortSignal): Promise<IEventIdTitle[]> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const path = serverRoutes.events.getEventsAutocomplete;
  const response = await fetch(baseUrl + path, { signal });
  return response.json();
};