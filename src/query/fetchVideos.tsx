import { serverRoutes } from "../server/server-routes";
import { IVideosData } from "../types/IVideosData";
import { IVideo } from "../types/IVideo";
import { QueryKey } from "@tanstack/react-query";
import { IVideosFilters } from "../types/IVideosFilters";

export const fetchVideos = async (queryKey: QueryKey, signal: AbortSignal): Promise<IVideosData> => {
  const filters = queryKey[1] as IVideosFilters;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const filteredParams = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== undefined)
  );
  const getFilteredVideosRequestString = serverRoutes.videos.getFilteredVideos(filteredParams);
  const response = await fetch(baseUrl + getFilteredVideosRequestString, { signal });
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};

export const videosSelector = (data: IVideosData) => ({
  ...data,
  videos: data.videos.map((video: IVideo) => ({
    ...video,
    startTimeDate: new Date(video.startTime),
    endTimeDate: new Date(video.endTime),
  })),
});