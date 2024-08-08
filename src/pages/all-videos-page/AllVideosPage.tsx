import c from './AllVideosPage.module.scss'
import { IconButton } from '@mui/material';
import VideosFilters from '../../components/videos-filters/VideosFilters';
import VideosGrid from '../../components/videos-grid/VideosGrid';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFilters } from '../../contexts/filters-context';
import { fetchEventsAutocomplete } from '../../query/fetchEventsAutocomplete';
import { IEventIdTitle } from '../../types/IEventIdTitle';
import { fetchVideos, videosSelector } from '../../query/fetchVideos';
import { IEventsAutoComplete } from '../../props/IEventsAutoComplete';
import { IVideo } from '../../types/IVideo';

export default function AllVideosPage() {
  const filters = useFilters();
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  // useToggleAsideOnKeyPress(toggleAside, setToggleAside);

  const {
    isFetching: eventsIsFetching,
    isPending: eventsIsPending,
    error: eventsError,
    data: eventsData
  } = useQuery<IEventIdTitle[]>({
    queryKey: ['events-autocomplete'],
    queryFn: ({ signal }) => fetchEventsAutocomplete(signal)
  });

  const {
    // isFetching: videosIsFetching,
    // isPending: videosIsPending,
    // error: videosError,
    data: videos,
  } = useQuery<IVideo[]>({
    queryKey: ['videos', filters],
    queryFn: ({ queryKey, signal }) => fetchVideos(queryKey, signal),  // Move filters into the queryKey to call invalidate from filters component & pass filters.
    select: (data: IVideo[]) => videosSelector(data)
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
            <VideosFilters />
          </div>
        </aside>
        <main>
          <VideosGrid
            videos={videos ?? []}
            // videosCount={videosCount ?? 0}
            eventsData={eventsDataProp} />
        </main>
      </div>
    </>
  )
}
{/* 
  {videosIsFetching || videosIsPending ?
  <CircularProgress /> :
  !videosError && videosData ?
  :
      ''
  }
*/}