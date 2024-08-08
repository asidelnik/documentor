import { serverRoutes } from "../server/server-routes";

export const mutateVideoStatus = async ({ videoId, status }: IVideoStatusMutationProps) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const requestPath = serverRoutes.videos.videoSetStatus(videoId, status);
  const response = await fetch(baseUrl + requestPath, { method: 'PUT' });
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};

export interface IVideoStatusMutationProps {
  videoId: string;
  status: number;
}