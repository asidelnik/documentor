import c from './AllVideosPage.module.scss'
import { CircularProgress, IconButton } from '@mui/material';
import VideosFilters from '../../components/videos-filters/VideosFilters';
import VideosGrid from '../../components/videos-grid/VideosGrid';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFilters } from '../../contexts/filters-context';
import { IVideosData } from '../../types/IVideosData';
import { fetchVideos, videosSelector } from '../../query/fetchVideos';

export default function AllVideosPage() {
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  const filters = useFilters();
  const { isFetching, isPending, error, data, refetch } = useQuery<IVideosData>({
    queryKey: ['fetchVideos'],
    queryFn: ({ signal }) => fetchVideos(filters, signal),
    select: (data: IVideosData) => videosSelector(data)
  });

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
            <VideosFilters fetchData={refetch} />
          </div>
        </aside>
        <main>
          {isFetching || isPending ?
            <CircularProgress /> :
            !error && data ?
              <VideosGrid videos={data.videos} videosCount={data.videosCount} fetchData={refetch} /> :
              ''
          }
        </main>
      </div>
    </>
  )
}