import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import { IDateTimeRangePickerProps } from '../../../props/IDateTimeRangePickerProps';
import { useState } from 'react';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';
import { filtersHelperTexts } from '../../../constants/filters-helper-texts';
import { DatePickerParent } from '../../../enums/DatePickerParent';
import { FilterParent } from '../../../enums/FilterParent';

export default function DateTimeRangePicker({ fromDateProp, toDateProp, parent, updateFromDate, updateToDate }: IDateTimeRangePickerProps) {
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(fromDateProp ? dayjs(fromDateProp) : null);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(toDateProp ? dayjs(toDateProp) : null);
  const [fromError, setFromError] = useState<DateTimeValidationError | null>(null);
  const [toError, setToError] = useState<DateTimeValidationError | null>(null);
  const getMaxFromDate = fromDate && toDate && fromDate.isAfter(toDate) ? toDate.startOf('day') : dayjs().endOf('day');

  function fromChangeHandler(value: dayjs.Dayjs | null): void {
    if (value !== null) {
      if (!dayjs(value).isValid()) {
        setFromError("invalidDate")
        return;
      }
    }

    if (toError === 'invalidDate') return;

    if (value && toDate && value.isAfter(toDate)) {
      const dayEnd = value.add(7, 'day'); // .endOf('day');
      setToDate(dayEnd);
      updateToDate(dayEnd.toDate())
    }

    setFromDate(value)
    updateFromDate(value?.toDate() ?? null)
  }

  function fromErrorHandler(newError: DateTimeValidationError) {
    setFromError(newError);
  }

  function toChangeHandler(value: dayjs.Dayjs | null): void {
    if (value !== null) {
      if (!dayjs(value).isValid()) {
        setToError("invalidDate")
        return;
      }
    }

    if (fromError === 'invalidDate') return;

    setToDate(value);
    updateToDate(value?.toDate() ?? null);
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
            helperText: filtersHelperTexts(fromError, DatePickerParent.Filter),
            size: parent === FilterParent.Events ? 'small' : 'medium'
          },
          field: { clearable: true, onClear: () => updateFromDate(null) },
        }}
        sx={{ minWidth: '320px', width: '320px', backgroundColor: 'white' }}
      />
      <DesktopDateTimePicker
        label="To date"
        value={toDate}
        disabled={fromError === 'invalidDate'}
        onChange={(value) => toChangeHandler(value)}
        onError={(newError: DateTimeValidationError) => toErrorHandler(newError)}
        slotProps={{
          textField: {
            helperText: filtersHelperTexts(toError, DatePickerParent.Filter),
            size: parent === FilterParent.Events ? 'small' : 'medium'
          },
          field: { clearable: true, onClear: () => updateToDate(null) },
        }}
        sx={{ minWidth: '320px', width: '320px', backgroundColor: 'white' }}
      />
    </LocalizationProvider>
  );
}
