import { serverRoutes } from "../../server/server-routes";
import { IVideo } from "../../types/IVideo";
import { QueryKey } from "@tanstack/react-query";
import { IVideosFilters } from "../../types/IVideosFilters";

export const fetchVideos = async (queryKey: QueryKey, signal: AbortSignal): Promise<IVideo[]> => {
  const filters = queryKey[1] as IVideosFilters;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const path = serverRoutes.videos.getFilteredVideos(filters);
  const response = await fetch(baseUrl + path, { signal });
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};

export const videosSelector = (videos: IVideo[]) => {
  return videos.map((video: IVideo) => ({
    ...video,
    startTimeDate: new Date(video.startTime),
    endTimeDate: new Date(video.endTime),
  }))
}

export const fetchVideosCount = async (queryKey: QueryKey, signal: AbortSignal): Promise<number> => {
  const filters = queryKey[1] as IVideosFilters;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const getFilteredVideosRequestString = serverRoutes.videos.getFilteredVideosCount(filters);

  const response = await fetch(baseUrl + getFilteredVideosRequestString, { signal });
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};