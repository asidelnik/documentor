import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import { IDateTimeRangePickerProps } from '../../../props/IDateTimeRangePickerProps';
import { DateTimeRange } from '../../../enums/DateTimeRange';
import { useState } from 'react';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';


export default function DateTimeRangePicker({ fromDateProp, toDateProp, updateFromDate, updateToDate }: IDateTimeRangePickerProps) {
  const [fromDate, setFromDate] = useState<dayjs.Dayjs>(fromDateProp ? dayjs(fromDateProp) : dayjs(new Date()));
  const [toDate, setToDate] = useState<dayjs.Dayjs>(toDateProp ? dayjs(fromDateProp) : dayjs(new Date()));
  const [fromError, setFromError] = useState<DateTimeValidationError | null>(null);
  const [toError, setToError] = useState<DateTimeValidationError | null>(null);

  function changeHandler(value: dayjs.Dayjs | null, picker: DateTimeRange): void {
    if (value === null) return;
    if (picker === DateTimeRange.From) {
      if (value.isAfter(toDate)) {
        setToDate(value.endOf('day'));
        updateToDate(value.endOf('day').toDate())
      }
      setFromDate(value)
      updateFromDate(value.toDate())
    } else {
      setToDate(value)
      updateToDate(value.toDate())
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDateTimePicker
        label="From date"
        onChange={(value) => changeHandler(value, DateTimeRange.From)}
        value={fromDate}
        disableFuture
        maxDate={dayjs(new Date())}
        onError={(newError: DateTimeValidationError) => setFromError(newError)}
        slotProps={{
          textField: {
            helperText: fromError === 'maxDate' || fromError === 'disableFuture' ? 'Future date not allowed.' : '',
          },
        }}
      />
      <DesktopDateTimePicker
        label="To date"
        onChange={(value) => changeHandler(value, DateTimeRange.To)}
        value={toDate}
        disableFuture
        shouldDisableDate={(date) => date.isBefore(fromDate)}
        maxDate={dayjs(new Date())}
        onError={(newError: DateTimeValidationError) => setToError(newError)}
        slotProps={{
          textField: {
            helperText: toError === 'maxDate' || toError === 'disableFuture' ? 'Future date not allowed.' : '',
          },
        }}
      />
    </LocalizationProvider>
  );
}
