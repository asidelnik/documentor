import { serverRoutes } from "../server/server-routes";

export const mutateVideoStatus = ({ videoId, status }: IMutateVideoStatusProps) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const requestPath = serverRoutes.videos.videoSetStatus(videoId, status);
  return fetch(baseUrl + requestPath, { method: 'PUT' });
};

interface IMutateVideoStatusProps {
  videoId: string;
  status: number;
}