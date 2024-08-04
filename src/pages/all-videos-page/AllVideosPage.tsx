import c from './AllVideosPage.module.scss'
import { CircularProgress, IconButton } from '@mui/material';
import VideosFilters from '../../components/videos-filters/VideosFilters';
import VideosGrid from '../../components/videos-grid/VideosGrid';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFilters } from '../../contexts/filters-context';
import { fetchEventsAutocomplete } from '../../query/fetchEventsAutocomplete';
import { IEventIdTitle } from '../../types/IEventIdTitle';
import { IVideosData } from '../../types/IVideosData';
import { fetchVideos, videosSelector } from '../../query/fetchVideos';
import { IEventsAutoComplete } from '../../props/IEventsAutoComplete';

export default function AllVideosPage() {
  const filters = useFilters();
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  const { isFetching: eventsIsFetching, isPending: eventsIsPending, error: eventsError, data: eventsData } = useQuery<IEventIdTitle[]>({
    queryKey: ['fetchEventsAutocomplete'],
    queryFn: ({ signal }) => fetchEventsAutocomplete(signal)
  });

  const { isFetching: videosIsFetching, isPending: videosIsPending, error: videosError, data: videosData, refetch: videosRefetch } = useQuery<IVideosData>({
    queryKey: ['fetchVideos'],
    queryFn: ({ signal }) => fetchVideos(filters, signal),
    select: (data: IVideosData) => videosSelector(data)
  });
  const eventsDataProp: IEventsAutoComplete = { isFetching: eventsIsFetching, isPending: eventsIsPending, error: eventsError, events: eventsData ?? [] };

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
            <VideosFilters fetchData={videosRefetch} />
          </div>
        </aside>
        <main>
          {videosIsFetching || videosIsPending ?
            <CircularProgress /> :
            !videosError && videosData ?
              <VideosGrid
                videos={videosData.videos}
                videosCount={videosData.videosCount}
                eventsData={eventsDataProp}
                fetchData={videosRefetch} /> :
              ''
          }
        </main>
      </div>
    </>
  )
}