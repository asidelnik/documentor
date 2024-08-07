import { serverRoutes } from "../server/server-routes";

export const mutateVideoStatus = ({ videoId, status }: IVideoStatusMutationProps) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const requestPath = serverRoutes.videos.videoSetStatus(videoId, status);
  return fetch(baseUrl + requestPath, { method: 'PUT' });
};

export interface IVideoStatusMutationProps {
  videoId: string;
  status: number;
}