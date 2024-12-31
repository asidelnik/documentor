import { EventPriority } from '../../constants/event-constants';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface IPriorityIcon {
  priority: number;
}

export default function EventPriorityIcon({ priority }: IPriorityIcon) {
  return (
    <>
      {priority === EventPriority.Low ?
        <KeyboardArrowDownIcon sx={{ color: 'hsl(207, 100%, 50%)' }} /> :
        priority === EventPriority.Medium ?
          <KeyboardArrowUpIcon sx={{ color: 'orange' }} /> :
          <KeyboardDoubleArrowUpIcon sx={{ color: 'red' }} />
      }
    </>
  );
}