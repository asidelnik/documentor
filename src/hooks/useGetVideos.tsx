import { useEffect, useRef, useState } from "react";
import { IVideo } from "../types/IVideo";
import { serverRoutes } from "../server/server-routes";
import { useFilters } from "../contexts/filters-context";

export default function useGetVideos() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [videosCount, setVideosCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const filters = useFilters();
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    fetchData();
    // Optionally reset the controller for future use
    return () => abortControllerRef.current.abort('useGetVideos - unmount'); //abort('useGetVideos - unmount');
  }, []); //signal, filters.statuses

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort('Request aborted');
      abortControllerRef.current = new AbortController();
    }
    const { signal } = abortControllerRef.current;

    try {
      const filteredParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== undefined));
      const getFilteredVideosRequestString = serverRoutes.getFilteredVideos(filteredParams);
      const response = await fetch(baseUrl + getFilteredVideosRequestString, { signal });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const filteredVideos = await response.json();
      if (filteredVideos && filteredVideos.videos) {
        const updatedVideos = filteredVideos.videos.map((video: IVideo) => {
          return {
            ...video,
            startTimeDate: new Date(video.startTime),
            endTimeDate: new Date(video.endTime),
          };
        });
        setVideos(updatedVideos);
        setVideosCount(filteredVideos.videosCount);
      }

      setIsError(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error === 'Aborted' ? '' : 'Error');
      setIsError(error === 'Aborted' ? false : true);
      setIsLoading(false);
    }
  }

  return { videos, videosCount, isLoading, isError, errorMessage, fetchData };
}