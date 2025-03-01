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
import { useEventsFiltersDispatch } from "../../contexts/events/useEventsFiltersDispatch";
import { useEventsFilters } from "../../contexts/events/useEventsFilters";
import EventStatusIcon from '../../shared/components/event-status-icon/EventStatusIcon';
import { formatEventLocation } from '../../utils/functions';
import LocationFilterMap from '../../shared/components/location-filter-map/LocationFilterMap';
import { LatLngLiteral } from 'leaflet';
import { useState } from 'react';
import EventPriorityIcon from '../../shared/components/event-priority-icon/EventPriorityIcon';


export default function EventsTable({ rows, eventsCount, isLoading, openDialog }: IEventsTableProps) {
  const filters = useEventsFilters();
  const filtersDispatch = useEventsFiltersDispatch();
  const [isShowMap, setIsShowMap] = useState<boolean>(false); // perhaps should be in global state

  const handlePageChange = (_event: unknown, newPage: number) => {
    filtersDispatch({ type: 'update-page', payload: newPage + 1 })
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filtersDispatch({ type: 'update-limit', payload: Number(event.target.value) })
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
        <TableContainer className={c.tableContainer}>
          <Table sx={{ minWidth: '1400px', tableLayout: 'fixed' }} aria-label="table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '50px' }}></TableCell>
                <TableCell sx={{ width: '240px' }}>Title</TableCell>
                <TableCell sx={{ minWidth: '100px' }}>Types</TableCell>
                <TableCell sx={{ width: '240px' }}>Start time</TableCell>
                <TableCell sx={{ width: '80px' }}>Duration</TableCell>
                <TableCell sx={{ minWidth: '100px' }}>Location</TableCell>
                <TableCell sx={{ width: '70px' }}>Priority</TableCell>
                <TableCell sx={{ minWidth: '100px' }}>Description</TableCell>
                <TableCell sx={{ width: '70px' }}>Status</TableCell>
                <TableCell sx={{ width: '70px' }}>Videos</TableCell>
                <TableCell sx={{ width: '100px' }}>To Review</TableCell>
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
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover={true}
                  >
                    <TableCell sx={{ width: '50px' }}>
                      <IconButton aria-label="edit event" onClick={() => editEvent(row._id)}>
                        <EditIcon className={c.editIcon} sx={{ fontSize: '1.1rem' }} />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      title={row.title}
                      sx={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <Link to={`/events/${row._id}`} className={c.eventLink}>{row.title}</Link>
                    </TableCell>
                    <TableCell
                      title={row.typesString}
                      sx={{ maxWidth: '200px' }}>
                      {row.typesString}
                    </TableCell>
                    <TableCell sx={{ width: '240px' }} title={row.startTimeFormatted}>{row.startTimeFormatted}</TableCell>
                    <TableCell sx={{ width: '80px' }}>{row.durationFormatted}</TableCell>
                    <TableCell title={formatEventLocation(row.locationTexts)}>{formatEventLocation(row.locationTexts)}</TableCell>
                    <TableCell title={row.priorityFormatted} sx={{ width: '70px' }}>
                      <EventPriorityIcon priority={row.priority} />
                    </TableCell>
                    <TableCell title={row.description}>{row.description}</TableCell>
                    <TableCell sx={{ width: '70px' }}>
                      <EventStatusIcon status={row.status} />
                    </TableCell>
                    <TableCell sx={{ width: '70px' }}>{row.videosCount}</TableCell>
                    <TableCell sx={{ width: '100px' }}>
                      <span className={row.videosUnprocessedCount > 0 ? c.eventToReview : ''}>{row.videosUnprocessedCount}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </>)}
            </TableBody>
          </Table>
        </TableContainer>

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
