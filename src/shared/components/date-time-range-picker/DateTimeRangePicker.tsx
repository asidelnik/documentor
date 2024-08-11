import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import { IDateTimeRangePickerProps } from '../../../props/IDateTimeRangePickerProps';
import { useState } from 'react';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';
import { filtersHelperTexts } from '../../../constants/filters-helper-texts';

export default function DateTimeRangePicker({ fromDateProp, toDateProp, updateFromDate, updateToDate }: IDateTimeRangePickerProps) {
  const [fromDate, setFromDate] = useState<dayjs.Dayjs>(fromDateProp ? dayjs(fromDateProp) : dayjs(new Date()));
  const [toDate, setToDate] = useState<dayjs.Dayjs>(toDateProp ? dayjs(toDateProp) : dayjs(new Date()));
  const [fromError, setFromError] = useState<DateTimeValidationError | null>(null);
  const [toError, setToError] = useState<DateTimeValidationError | null>(null);
  const getMaxFromDate = fromDate.isAfter(toDate) ? toDate.startOf('day') : dayjs().endOf('day');

  function fromChangeHandler(value: dayjs.Dayjs | null): void {
    if (value === null) return;

    if (!dayjs(value).isValid()) {
      setFromError("invalidDate")
      return;
    }

    if (toError === 'invalidDate') return;

    if (value.isAfter(toDate)) {
      const dayEnd = value.endOf('day'); // .add(7, 'day');
      setToDate(dayEnd);
      updateToDate(dayEnd.toDate())
    }

    setFromDate(value)
    updateFromDate(value.toDate())
  }

  function fromErrorHandler(newError: DateTimeValidationError) {
    setFromError(newError);
  }

  function toChangeHandler(value: dayjs.Dayjs | null): void {
    if (value === null) return;

    if (!dayjs(value).isValid()) {
      setToError("invalidDate")
      return;
    }

    if (fromError === 'invalidDate') return;

    setToDate(value)
    updateToDate(value.toDate())
  }

  function toErrorHandler(newError: DateTimeValidationError) {
    setToError(newError);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDateTimePicker
        label="From date"
        value={fromDate}
        disableFuture
        disabled={toError === 'invalidDate'}
        maxDate={getMaxFromDate}
        onChange={(value) => fromChangeHandler(value)}
        onError={(newError: DateTimeValidationError) => fromErrorHandler(newError)}
        slotProps={{
          textField: {
            helperText: filtersHelperTexts(fromError),
          },
        }}
        sx={{ width: '300px', backgroundColor: 'white' }}
      />
      <DesktopDateTimePicker
        label="To date"
        value={toDate}
        disabled={fromError === 'invalidDate'}
        onChange={(value) => toChangeHandler(value)}
        onError={(newError: DateTimeValidationError) => toErrorHandler(newError)}
        slotProps={{
          textField: {
            helperText: filtersHelperTexts(toError),
          },
        }}
        sx={{ width: '300px', backgroundColor: 'white' }}
      />
    </LocalizationProvider>
  );
}
