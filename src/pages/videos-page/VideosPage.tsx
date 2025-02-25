import c from './VideosPage.module.scss'
import { IconButton, MenuItem, Pagination, Select } from '@mui/material';
import VideosFilters from '../../components/videos-filters/VideosFilters';
import VideosGrid from '../../components/videos-grid/VideosGrid';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEventsAutocomplete } from '../../query/events/fetchEventsAutocomplete';
import { IOptionStr } from '../../types/IOptionStr';
import { fetchVideos, fetchVideosCount, videosSelector } from '../../query/videos/fetchVideos';
import { IEventsAutoComplete } from '../../props/IEventsAutoComplete';
import { IVideo } from '../../types/IVideo';
import { useEventsFiltersDispatch } from "../../contexts/events/useEventsFiltersDispatch";
import LocationFilterMap from '../../shared/components/location-filter-map/LocationFilterMap';
import { LatLngLiteral } from 'leaflet';
import { useVideosFilters } from '../../contexts/videos/useVideosFilters';
import { useVideosFiltersDispatch } from '../../contexts/videos/useVideosFiltersDispatch';

export default function VideosPage() {
  const filters = useVideosFilters();
  const dispatch = useVideosFiltersDispatch();
  const eventsFiltersDispatch = useEventsFiltersDispatch();
  const [toggleAside, setToggleAside] = useState<boolean>(true);
  const [isShowMap, setIsShowMap] = useState<boolean>(false);
  const updateLngLat = (center: LatLngLiteral) =>
    dispatch({ type: 'update-lng-lat', payload: { lat: center.lat, lng: center.lng, radius: filters.radius || 500 } });

  useEffect(() => {
    eventsFiltersDispatch({ type: 'update-page', payload: 1 });
  }, [eventsFiltersDispatch]);

  const {
    isFetching: eventsIsFetching,
    isPending: eventsIsPending,
    error: eventsError,
    data: eventsData
  } = useQuery<IOptionStr[]>({
    queryKey: ['events-autocomplete'],
    queryFn: ({ signal }) => fetchEventsAutocomplete(signal)
  });

  const { data: videos, } =
    useQuery<IVideo[]>({
      queryKey: ['videos', filters],
      queryFn: ({ queryKey, signal }) => fetchVideos(queryKey, signal),  // Move filters into the queryKey to call invalidate from filters component & pass filters.
      select: (data: IVideo[]) => videosSelector(data)
    });

  const {
    data: videosCount, isFetching: videosCountIsFetching
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

          <div className={toggleAside ? c.filtersScrollContainer : 'hidden'}>
            <VideosFilters eventsData={eventsDataProp} isShowMap={isShowMap} setIsShowMap={setIsShowMap} />
          </div>
        </aside>
        <main>
          <VideosGrid
            videos={videos ?? []}
            videosCount={videosCount ?? 0}
            videosCountIsFetching={videosCountIsFetching}
            eventsData={eventsDataProp} />

          {isShowMap &&
            <LocationFilterMap
              lat={filters.lat}
              lng={filters.long}
              radius={filters.radius || 500}
              setCenter={updateLngLat} />
          }

          <footer className={c.pagination}>
            <Select
              value={filters.limit}
              onChange={(event) => dispatch({ type: 'update-limit', payload: Number(event.target.value) })}
              displayEmpty
              renderValue={(value) => `${value} per page`}
              aria-label='limit-select'
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>

            <Pagination
              count={videosCount ? videosCount % filters.limit === 0 ? videosCount / filters.limit : Math.floor(videosCount / filters.limit) + 1 : 0}
              page={filters.page}
              onChange={(_event, newPage) => dispatch({ type: 'update-page', payload: newPage })}
              showFirstButton
              showLastButton
              variant="outlined"
              color="primary"
              size='large'
            />

          </footer>
        </main>
      </div>
    </>
  )
}