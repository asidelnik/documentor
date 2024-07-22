
import VideosFilters from '../components/videos-filters/VideosFilters';
import VideosGrid from '../components/videos-grid/VideosGrid';
import { VideoStatusEnum } from "../constants/video-status";
import useGetVideos from "../hooks/useGetVideos";

export default function AllVideosPage() {
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
  const { videos, videosCount, isLoading, isError, errorMessage, fetchData } = useGetVideos(defaultFilters);

  return (
    <>
      <VideosFilters defaultFilters={defaultFilters} fetchData={fetchData} />
      {videos && videos.length > 0 &&
        <VideosGrid videos={videos} videosCount={videosCount} />
      }
    </>
  )
}