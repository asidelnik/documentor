import { serverRoutes } from "../../server/server-routes";
import { IOptionStr } from "../../types/IOptionStr";

export const fetchEventTypes = async (): Promise<Array<IOptionStr>> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const path = serverRoutes.others.getEventTypes;
  const response = await fetch(baseUrl + path);
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};
