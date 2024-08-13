import c from "./EventsFilters.module.scss";
import { eventPriorityAutocompleteOptions } from "../../constants/event-constants";
import { useEventsFilters, useEventsFiltersDispatch } from "../../contexts/events-filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

export default function EventsFilters() {
  const filters = useEventsFilters();
  const filtersDispatch = useEventsFiltersDispatch();

  // TODO filter: location
  const fromDateChangeHandler = (fromDate: Date) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const toDateChangeHandler = (toDate: Date) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const selectChangeHandler = (dispatchType: string, options: number[]) => filtersDispatch({ type: dispatchType, payload: options });
  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => filtersDispatch({ type: 'update-free-text', payload: event.target.value });

  return (
    <>
      <div className={c.filtersContainer}>
        <DateTimeRangePicker
          fromDateProp={filters.fromDate}
          toDateProp={filters.toDate}
          updateFromDate={fromDateChangeHandler}
          updateToDate={toDateChangeHandler}
        />

        <MultipleSelectCheckmarks
          buttonText='Priority'
          options={eventPriorityAutocompleteOptions}
          defaultOptions={filters?.priority ?? []}
          updateSelectedOptions={(options: number[]) => selectChangeHandler('update-priority', options)}
        />

        <TextField
          id="title-desc"
          label="Texts filter"
          variant="outlined"
          onChange={textChangeHandler}
          sx={{ width: '300px' }}
        />
      </div>
    </>
  )
}