import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';
import dayjs from "dayjs";
import { useState } from "react";
import { IDatePickerProps } from "../../../props/IDateTimeRangePickerProps";
import { filtersHelperTexts } from "../../../constants/filters-helper-texts";
import { DatePickerParent } from "../../../enums/DatePickerParent";

export default function MonthYearPicker({ fromDateProp, toDateProp, updateFromDate, updateToDate }: IDatePickerProps) {
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
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From date"
          views={['month', 'year']}
          format="MM/YY"
          value={fromDate}
          disableFuture
          disabled={toError === 'invalidDate'}
          maxDate={getMaxFromDate}
          onChange={(value) => fromChangeHandler(value)}
          onError={(newError: DateTimeValidationError) => fromErrorHandler(newError)}
          slotProps={{
            textField: {
              helperText: filtersHelperTexts(fromError, DatePickerParent.Filter),
              size: 'medium'
            },
          }}
          sx={{ width: '157px', backgroundColor: 'white' }}
        />
        <DatePicker
          label="To date"
          views={['month', 'year']}
          format="MM/YY"
          value={toDate}
          disabled={fromError === 'invalidDate'}
          onChange={(value) => toChangeHandler(value)}
          onError={(newError: DateTimeValidationError) => toErrorHandler(newError)}
          slotProps={{
            textField: {
              helperText: filtersHelperTexts(toError, DatePickerParent.Filter),
              size: 'medium'
            },
          }}
          sx={{ width: '157px', backgroundColor: 'white' }}
        />
      </LocalizationProvider>
    </>
  )
}