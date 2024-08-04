import { serverRoutes } from "../server/server-routes";
import { IVideosData } from "../types/IVideosData";
import { IVideosFilters } from "../types/IVideosFilters";
import { IVideo } from "../types/IVideo";

export const fetchVideos = async (filters: IVideosFilters, signal: AbortSignal): Promise<IVideosData> => {
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