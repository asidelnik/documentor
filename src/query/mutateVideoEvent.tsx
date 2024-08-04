import { serverRoutes } from "../server/server-routes";

export const mutateVideoEvent = ({ videoId, newEventId, oldEventId }: IMutateVideoEventProps) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const requestPath = serverRoutes.videos.videoSetEvent(videoId, newEventId, oldEventId);
  return fetch(baseUrl + requestPath, { method: 'PUT' });
}

interface IMutateVideoEventProps {
  videoId: string;
  newEventId: string | null;
  oldEventId: string | null;
}