
import { useEffect, useState } from "react";
import { serverRoutes } from "../server/server-routes";
import { Video } from "../types/video";
import { IGetVideosFilters } from "../types/IGetVideosFilters";
import VideosFilters from '../components/videos-filters/VideosFilters';
import VideosGrid from '../components/videos-grid/VideosGrid';
import { VideoStatusEnum } from "../constants/video-status";

export default function AllVideosPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosCount, setVideosCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const defaultFilters = {
    fromDate: '2023-10-01T00:00',
    toDate: '2023-10-27T00:00',
    lat: 32.0853,
    lng: 34.7818,
    radius: 10,
    statuses: [VideoStatusEnum.Unprocessed],
    page: 1,
    limit: 100,
  }
  // Abort fetchData request call if another call has been made before previous completion
  let fetchController = new AbortController();

  useEffect(() => {
    fetchData(defaultFilters);
    return () => fetchController.abort()
  }, [])

  const fetchData = async (params: IGetVideosFilters) => {
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

  return (
    <>
      <VideosFilters defaultFilters={defaultFilters} fetchData={fetchData} />
      {videos && videos.length > 0 &&
        <VideosGrid videos={videos} videosCount={videosCount} />
      }
    </>
  )
}