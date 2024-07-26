import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { IDateTimeRangePickerProps } from '../../../props/IDateTimeRangePickerProps';
import dayjs from 'dayjs';

export default function DateTimeRangePicker({ fromDate, toDate, updateFromDate, updateToDate }: IDateTimeRangePickerProps) {

  //https://mui.com/x/react-date-pickers/date-time-picker/
  function fromChangeHandler(value: dayjs.Dayjs): void {
    console.log(value.toDate())
  }

  function toChangeHandler(value: dayjs.Dayjs): void {
    console.log(value.toDate())
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDateTimePicker
        label="From date"
        onChange={(value, context) => fromChangeHandler(value)}
        value={dayjs(new Date())}
      // sx={{ height: '50px' }}
      />
      <DesktopDateTimePicker
        label="To date"
        onChange={(value, context) => toChangeHandler(value)}
        value={dayjs(new Date())}
      // sx={{ height: '50px' }}
      />
    </LocalizationProvider>
  );
}
