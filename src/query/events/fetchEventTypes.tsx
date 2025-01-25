import { serverRoutes } from "../../server/server-routes";
import { IOptionStr } from "../../types/IOptionStr";

export const fetchEventTypes = async (signal: AbortSignal): Promise<Array<IOptionStr>> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const path = serverRoutes.others.getEventTypes;
  const response = await fetch(baseUrl + path, { signal });
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};
