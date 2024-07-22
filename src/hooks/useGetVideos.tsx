import { useEffect, useState } from "react";
import { Video } from "../types/video";
import { IGetVideosFilters } from "../types/IGetVideosFilters";
import { serverRoutes } from "../server/server-routes";

export default function useGetVideos(defaultFilters: IGetVideosFilters) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosCount, setVideosCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  let fetchController = new AbortController();

  useEffect(() => {
    fetchData(defaultFilters);
    return () => fetchController.abort();
  }, [])

  const fetchData = async (params: IGetVideosFilters) => {
    setIsLoading(true);
    fetchController.abort('Newer fetch called');
    fetchController = new AbortController();
    const { signal } = fetchController;
    try {
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== undefined));
      const getFilteredVideosRequestString = serverRoutes.getFilteredVideos(filteredParams);

      const response = await fetch(baseUrl + getFilteredVideosRequestString, { signal });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const filteredVideos = await response.json();
      if (filteredVideos && filteredVideos.videos) {
        const updatedVideos = filteredVideos.videos.map((video: Video) => {
          return {
            ...video,
            startTime: new Date(video.startTime),
            endTime: new Date(video.endTime),
          };
        });
        setVideos(updatedVideos);
        setVideosCount(filteredVideos.videosCount);
      }

      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setErrorMessage('error');
      setIsError(true);
      setIsLoading(false);
    }
  }
  return { videos, videosCount, isLoading, isError, errorMessage, fetchData };
}