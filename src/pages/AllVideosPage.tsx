import c from "./AllVideosPage.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { serverRoutes } from "../server/server-routes";
import { Video } from "../types/video";
import ReactPlayer from 'react-player'
import { GetVideosQueryParams } from "../types/getVideosQueryParams";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";

export default function AllVideosPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosCount, setVideosCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [volume, setVolume] = useState(0.5);

  const [filters, setFilters] = useState<GetVideosQueryParams>({
    fromDate: '2023-10-01T00:00',
    toDate: '2023-10-27T00:00',
    lat: 32.0853,
    lon: 34.7818,
    radius: 10,
    status: 1,
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    fetchData(filters);
  }, [filters]);

  const fetchData = async (params: GetVideosQueryParams) => {
    try {
      const getFilteredVideosRequestString = serverRoutes.getFilteredVideos(params);

      const response = await fetch(baseUrl + getFilteredVideosRequestString);
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
        console.log(filteredVideos);
        setVideos(updatedVideos);
        setVideosCount(filteredVideos.videosCount);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage('error');
      setIsError(true);
      setIsLoading(false);
    }
  }

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  }

  const handleSearch = (event: any) => {
    if (event.key === 'Enter') {
      fetchData(filters);
    }
  }

  const handleSearchClick = () => {
    fetchData(filters);
  }

  return (
    <>
      <div className={c.filtersContainer}>
        <form>
          <input
            type="datetime-local"
            name="fromDate"
            placeholder="From date"
            value={filters.fromDate}
            onChange={handleFilterChange}
            onKeyDown={handleSearch}
          />
          <input
            type="datetime-local"
            name="toDate"
            placeholder="To date"
            value={filters.toDate}
            onChange={handleFilterChange}
            onKeyDown={handleSearch}
          />
          {/* Add more filter inputs here */}
          <input type="number"
            name="lat"
            value={filters.lat}
            onChange={handleFilterChange}
            onKeyDown={handleSearch}
          />
          <input type="number" name="lon" value={filters.lon} onChange={handleFilterChange}
            onKeyDown={handleSearch}
          />
          <input type="number" name="radius" value={filters.radius} onChange={handleFilterChange}
            onKeyDown={handleSearch}
          />

          <input type="number" name="status" value={filters.status} onChange={handleFilterChange}
            onKeyDown={handleSearch}
          />
          {/* <input type="text" name="tags" value={filters.tags} onChange={handleFilterChange} /> */}

          <IconButton aria-label="search" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </form>
      </div>

      <div className={c.videoCount}>{videosCount} videos</div>
      <div className={c.videoGridContainer}>
        <div className={c.videoGrid}>
          {videos.map((video) => (
            <div key={video.id} className={c.videoItem}>
              <ReactPlayer
                key={video.id}
                url={video.url}
                className={c.videoItem}
                controls={true}
                config={{
                  youtube: {
                    embedOptions: {
                      width: "315",
                      height: "177"
                    }
                  }
                }}
                volume={volume}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}