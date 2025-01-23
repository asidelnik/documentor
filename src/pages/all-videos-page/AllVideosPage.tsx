import c from './AllVideosPage.module.scss'
import { IconButton } from '@mui/material';
import VideosFilters from '../../components/videos-filters/VideosFilters';
import VideosGrid from '../../components/videos-grid/VideosGrid';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFilters } from '../../contexts/filters-context';
import { fetchEventsAutocomplete } from '../../query/events/fetchEventsAutocomplete';
import { IOptionStr } from '../../types/IOptionStr';
import { fetchVideos, fetchVideosCount, videosSelector } from '../../query/videos/fetchVideos';
import { IEventsAutoComplete } from '../../props/IEventsAutoComplete';
import { IVideo } from '../../types/IVideo';
import { useEventsFiltersDispatch } from '../../contexts/events-filters-context';

export default function AllVideosPage() {
  const filters = useFilters();
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  const eventsFiltersDispatch = useEventsFiltersDispatch();
  // useToggleAsideOnKeyPress(toggleAside, setToggleAside);
  useEffect(() => {
    eventsFiltersDispatch({ type: 'update-page', payload: 1 });
  }, []);

  const {
    isFetching: eventsIsFetching,
    isPending: eventsIsPending,
    error: eventsError,
    data: eventsData
  } = useQuery<IOptionStr[]>({
    queryKey: ['events-autocomplete'],
    queryFn: ({ signal }) => fetchEventsAutocomplete(signal)
  });

  const {
    data: videos,
  } = useQuery<IVideo[]>({
    queryKey: ['videos', filters],
    queryFn: ({ queryKey, signal }) => fetchVideos(queryKey, signal),  // Move filters into the queryKey to call invalidate from filters component & pass filters.
    select: (data: IVideo[]) => videosSelector(data)
  });

  const {
    data: videosCount,
  } = useQuery<number>({
    queryKey: ['videos-count', filters],
    queryFn: ({ queryKey, signal }) => fetchVideosCount(queryKey, signal)
  });

  const eventsDataProp: IEventsAutoComplete = { isFetching: eventsIsFetching, isPending: eventsIsPending, error: eventsError, events: eventsData ?? [] };

  return (
    <>
      <div className={c.container}>
        <aside className={toggleAside ? c.asideOpen : c.asideClose}>
          <div className={c.asideToggle}>
            <IconButton onClick={() => setToggleAside(!toggleAside)} aria-label="toggle aside">
              {toggleAside ? <KeyboardArrowLeftIcon /> : <FilterAltOutlinedIcon />}
            </IconButton>
          </div>

          <div className={toggleAside ? 'visible' : 'hidden'}>
            <VideosFilters eventsData={eventsDataProp} />
          </div>
        </aside>
        <main>
          <VideosGrid
            videos={videos ?? []}
            videosCount={videosCount ?? 0}
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