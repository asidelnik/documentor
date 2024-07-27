import c from './AllVideosPage.module.scss'
import { CircularProgress, IconButton } from '@mui/material';
import VideosFilters from '../../components/videos-filters/VideosFilters';
import VideosGrid from '../../components/videos-grid/VideosGrid';
import useGetVideos from "../../hooks/useGetVideos";
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import { useState } from 'react';

export default function AllVideosPage() {
  const { videos, videosCount, isLoading, isError, errorMessage, fetchData } = useGetVideos();
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  return (
    <>
      <div className={c.container}>
        <aside className={toggleAside ? c.asideOpen : c.asideClose}>
          <div className={c.asideToggle}>
            <IconButton onClick={() => setToggleAside(!toggleAside)} aria-label="toggle aside">
              <FilterListRoundedIcon />
            </IconButton>
          </div>

          <div className={toggleAside ? 'visible' : 'hidden'}>
            <VideosFilters fetchData={fetchData} />
          </div>
        </aside>
        <main>
          {isLoading ?
            <CircularProgress /> :
            <VideosGrid videos={videos} videosCount={videosCount} fetchData={fetchData} />
          }
        </main>
      </div>
    </>
  )
}