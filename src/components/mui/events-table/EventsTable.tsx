import c from './EventsTable.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { IEventsTableProps } from '../../../props/eventsTableProps';
import { EventType } from '../../../types/event';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from '@mui/material';
import { EventsActionTitle } from '../../../enums/EventsActionTitle';


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

  const editEvent = (eventId: number) => {
    openDialog(EventsActionTitle.Edit, eventId);
  }

  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: '10px 5px 10px 0px' }}></TableCell>
                <TableCell sx={{ padding: '10px 5px 10px 0px' }}>Title</TableCell>
                <TableCell sx={{ padding: '10px 5px 10px 0px' }}>Start time</TableCell>
                <TableCell sx={{ padding: '10px 5px 10px 0px' }}>Duration</TableCell>
                <TableCell sx={{ padding: '10px 5px 10px 0px' }}>Description</TableCell>
                <TableCell sx={{ padding: '10px 5px 10px 0px' }}>Location</TableCell>
                <TableCell sx={{ padding: '10px 5px 10px 0px' }}>Status</TableCell>
                <TableCell sx={{ padding: '10px 5px 10px 0px' }}>Videos</TableCell>
                <TableCell sx={{ padding: '10px 5px 10px 0px' }}>Review</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0 && rows.map((row: EventType) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <IconButton aria-label="edit event" onClick={() => editEvent(row.id)}>
                      <EditIcon className={c.editIcon} />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link to={`/events/${row.id}`} className={c.eventLink}>{row.title}</Link>
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
          <Button variant="contained" onClick={addEvent}>Add</Button>
        </footer>
      </Paper >
    </>
  );
}