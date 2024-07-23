
import { CircularProgress } from '@mui/material';
import VideosFilters from '../components/videos-filters/VideosFilters';
import VideosGrid from '../components/videos-grid/VideosGrid';
import useGetVideos from "../hooks/useGetVideos";

export default function AllVideosPage() {
  const { videos, videosCount, isLoading, isError, errorMessage, fetchData } = useGetVideos();
  return (
    <>
      <VideosFilters fetchData={fetchData} />
      {isLoading ? <CircularProgress /> :
        <VideosGrid videos={videos} videosCount={videosCount} fetchData={fetchData} /> 
      }
    </>
  )
}