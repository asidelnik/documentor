import { serverRoutes } from "../server/server-routes";

export const mutateVideoEvent = async ({ videoId, newEventId, oldEventId }: IVideoEventMutationProps) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const requestPath = serverRoutes.videos.videoSetEvent(videoId, newEventId, oldEventId);
  const response = await fetch(baseUrl + requestPath, { method: 'PUT' });
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
}

export interface IVideoEventMutationProps {
  videoId: string;
  newEventId: string | null;
  oldEventId: string | null;
}