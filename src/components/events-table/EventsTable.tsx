import c from './EventsTable.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { EventsAction } from '../../enums/EventsAction';
import EventsFilters from '../events-filters/EventsFilters';
import { IEventsTableProps } from '../../props/IEventsTableProps';
import { IEventAndCalcsForTable } from '../../types/IEvent';
import { useEventsFilters, useEventsFiltersDispatch } from '../../contexts/events-filters-context';
import EventPriorityIcon from '../../shared/components/EventPriorityIcon';
import EventStatusIcon from '../../shared/components/EventStatusIcon';
import { formatEventLocation } from '../../utils/functions';
import LocationFilterMap from '../../shared/components/location-filter-map/LocationFilterMap';
import { LatLngLiteral } from 'leaflet';
import { useState } from 'react';


export default function EventsTable({ rows, eventsCount, isLoading, openDialog }: IEventsTableProps) {
  const filters = useEventsFilters();
  const filtersDispatch = useEventsFiltersDispatch();
  const [isShowMap, setIsShowMap] = useState<boolean>(false); // perhaps should be in global state

  const handlePageChange = (_event: unknown, newPage: number) => {
    filtersDispatch({ type: 'update-page', payload: newPage + 1 })
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filtersDispatch({ type: 'update-limit', payload: event.target.value })
  };

  const addEvent = () => {
    openDialog(EventsAction.Add);
  }

  const editEvent = (eventId: string) => {
    openDialog(EventsAction.Edit, eventId);
  }


  const updateLngLat = (center: LatLngLiteral) =>
    filtersDispatch({ type: 'update-lng-lat', payload: { lat: center.lat, lng: center.lng, radius: filters.radius || 500 } });


  return (
    <>
      <EventsFilters isShowMap={isShowMap} setIsShowMap={setIsShowMap} />
      <main style={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Types</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Videos</TableCell>
              <TableCell>To Review</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (<>
                {rows?.length > 0 && rows.map((row: IEventAndCalcsForTable) => (

        {isShowMap &&
          <LocationFilterMap
            lat={filters.lat}
            lng={filters.long}
            radius={filters.radius || 500}
            setCenter={updateLngLat} />
        }

        <footer className={c.pagination}>
          <IconButton
            onClick={addEvent}
            sx={{ backgroundColor: 'primary.main', ":hover": { backgroundColor: 'primary.light' } }}
          >
            <AddIcon sx={{ color: 'white', fontWeight: 'bold' }} />
          </IconButton>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 25, 50]}
            labelRowsPerPage="Rows"
            rowsPerPage={filters.limit}
            component="div"
            count={eventsCount}
            page={filters.page === 0 ? 0 : filters.page - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
          />
        </footer>
      </main>
    </>
  );
}
