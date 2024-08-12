import c from './EventsTable.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import { EventsActionTitle } from '../../enums/EventsActionTitle';
import EventsFilters from '../events-filters/EventsFilters';
import { IEventsTableProps } from '../../props/eventsTableProps';
import { IEventAndCalcs } from '../../types/IEvent';
import { eventPrioirtyLabels, EventPriority } from '../../constants/event-constants';


export default function EventsTable({ rows, eventsCount, getPageRows, openDialog }: IEventsTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    getPageRows(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const perPage = parseInt(event.target.value, 10);
    setRowsPerPage(perPage);
    setPage(0);
    getPageRows(1, perPage);
  };

  const addEvent = () => {
    openDialog(EventsActionTitle.Add);
  }

  const editEvent = (eventId: string) => {
    openDialog(EventsActionTitle.Edit, eventId);
  }

  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EventsFilters

        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Start time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Videos</TableCell>
                <TableCell>To Review</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.length > 0 && rows.map((row: IEventAndCalcs) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover={true}
                >
                  <TableCell></TableCell>
                  <TableCell>
                    <IconButton aria-label="edit event" onClick={() => editEvent(row.id)}>
                      <EditIcon className={c.editIcon} sx={{ fontSize: '1.1rem' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link to={`/events/${row.id}`} className={c.eventLink}>{row.title}</Link>
                  </TableCell>
                  <TableCell title={eventPrioirtyLabels[row.priority]}>
                    {row.priority === EventPriority.Low ? <KeyboardArrowDownIcon sx={{ color: 'hsl(207, 100%, 50%)' }} /> :
                      row.priority === EventPriority.Medium ? <KeyboardArrowUpIcon sx={{ color: 'orange' }} /> :
                        <KeyboardDoubleArrowUpIcon sx={{ color: 'red' }} />
                    }
                  </TableCell>
                  <TableCell>{row.startTimeFormatted}</TableCell>
                  <TableCell>{row.durationFormatted}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.locationName}</TableCell>
                  <TableCell>{row.statusFormatted}</TableCell>
                  <TableCell>{row.videosCount}</TableCell>
                  <TableCell>
                    <span className={row.videosUnprocessedCount > 0 ? c.eventToReview : ''}>{row.videosUnprocessedCount}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <footer className={c.pagination}>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 25]}
            labelRowsPerPage="Rows"
            rowsPerPage={rowsPerPage}
            component="div"
            count={eventsCount}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <IconButton
            onClick={addEvent}
            sx={{ backgroundColor: 'primary.main', ":hover": { backgroundColor: 'primary.light' } }}
          >
            <AddIcon sx={{ color: 'white', fontWeight: 'bold' }} />
          </IconButton>
        </footer>
      </Paper >
    </>
  );
}
