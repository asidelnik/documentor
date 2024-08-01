import c from './DateTimeRangePicker.module.scss'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import { IDateTimeRangePickerProps } from '../../../props/IDateTimeRangePickerProps';
import { useState } from 'react';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';


export default function DateTimeRangePicker({ fromDateProp, toDateProp, updateFromDate, updateToDate, setValidationError }: IDateTimeRangePickerProps) {
  const [fromDate, setFromDate] = useState<dayjs.Dayjs>(fromDateProp ? dayjs(fromDateProp) : dayjs(new Date()));
  const [toDate, setToDate] = useState<dayjs.Dayjs>(toDateProp ? dayjs(toDateProp) : dayjs(new Date()));
  const [fromError, setFromError] = useState<DateTimeValidationError | null>(null);
  const [toError, setToError] = useState<DateTimeValidationError | null>(null);

  function fromChangeHandler(value: dayjs.Dayjs | null): void {
    if (value === null) return;
    if (value.isAfter(toDate)) {
      const dayEnd = value.endOf('day'); // .add(7, 'day');
      setToDate(dayEnd);
      // TODO - if validation error, don't update to date & don't fetch data
      updateToDate(dayEnd.toDate())
    }
    setFromDate(value)
    // TODO - if validation error, don't update from date & don't fetch data
    updateFromDate(value.toDate())
  }

  function fromErrorHandler(newError: DateTimeValidationError) {
    setFromError(newError);
    setValidationError(newError === null && toError === null ? false : true);
  }

  function toChangeHandler(value: dayjs.Dayjs | null): void {
    if (value === null) return;
    setToDate(value)
    // TODO - if validation error, don't update to date & don't fetch data
    updateToDate(value.toDate())
  }

  function toErrorHandler(newError: DateTimeValidationError) {
    setToError(newError);
    setValidationError(newError === null && fromError === null ? false : true);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={c.rangeContainer}>
        <DesktopDateTimePicker
          label="From date"
          onChange={(value) => fromChangeHandler(value)}
          value={fromDate}
          disableFuture
          maxDate={dayjs(new Date())}
          onError={(newError: DateTimeValidationError) => fromErrorHandler(newError)}
          slotProps={{
            textField: {
              helperText: fromError === 'maxDate' || fromError === 'disableFuture' ? 'Future date not allowed.' : '',
            },
          }}
          sx={{ width: '100%', backgroundColor: 'white' }}
        />
        <DesktopDateTimePicker
          label="To date"
          onChange={(value) => toChangeHandler(value)}
          value={toDate}
          disableFuture
          shouldDisableDate={(date) => date.isBefore(fromDate)}
          maxDate={dayjs(new Date())}
          onError={(newError: DateTimeValidationError) => toErrorHandler(newError)}
          slotProps={{
            textField: {
              helperText: toError === 'maxDate' || toError === 'disableFuture' ? 'Future date not allowed.' : '',
            },
          }}
          sx={{ width: '100%', backgroundColor: 'white' }}
        />
      </div>
    </LocalizationProvider>
  );
}
