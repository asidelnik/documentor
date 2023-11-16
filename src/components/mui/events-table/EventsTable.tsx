import c from './EventsTable.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EventsTableProps } from '../../../props/eventsTableProps';
import { EventType } from '../../../types/event';
import { Link } from 'react-router-dom';


export default function EventsTable({ rows }: EventsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Start time</TableCell>
            <TableCell>End time</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Videos to review</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: EventType) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/events/${row.id}`}>{row.title}</Link>
              </TableCell>
              <TableCell>{row.startTimeFormatted}</TableCell>
              <TableCell>{row.endTimeFormatted}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.durationFormatted}</TableCell>
              <TableCell>{row.locationName}</TableCell>
              <TableCell>{row.statusFormatted}</TableCell>
              <TableCell>{row.videosUnprocessedCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}