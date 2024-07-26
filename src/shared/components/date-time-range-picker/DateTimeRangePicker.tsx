import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import { IDateTimeRangePickerProps } from '../../../props/IDateTimeRangePickerProps';
import dayjs from 'dayjs';

export default function DateTimeRangePicker({ fromDate, toDate, updateFromDate, updateToDate }: IDateTimeRangePickerProps) {
  function fromChangeHandler(value: any, context: PickerChangeHandlerContext<DateTimeValidationError>): void {
    console.log(value, context)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker label="From date" onChange={fromChangeHandler} value={dayjs(new Date())} defaultValue={dayjs(new Date())} sx={{ height: '150px' }} />
      <DateTimePicker label="To date" onChange={fromChangeHandler} value={dayjs(new Date())} defaultValue={dayjs(new Date())} sx={{ height: '150px' }} />
    </LocalizationProvider>
  );
}
