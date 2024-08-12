import c from "./EventsFilters.module.scss";
import { eventPriorityAutocompleteOptions, EventPriority } from "../../constants/event-constants";
import { useEventsFilters, useEventsFiltersDispatch } from "../../contexts/events-filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

export default function EventsFilters() {
  const filters = useEventsFilters();
  const filtersDispatch = useEventsFiltersDispatch();

  // Filters: free text on title & description, location
  const updateFromDateHandler = (fromDate: Date) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const selectHandler = (dispatchType: string, options: number[]) => filtersDispatch({ type: dispatchType, payload: options });

  return (
    <>
      <div className={c.filtersContainer}>
        <DateTimeRangePicker
          fromDateProp={filters.fromDate}
          toDateProp={filters.toDate}
          updateFromDate={updateFromDateHandler}
          updateToDate={updateToDateHandler}
        />

        <MultipleSelectCheckmarks
          buttonText='Priority'
          options={eventPriorityAutocompleteOptions}
          defaultOptions={[EventPriority.Low, EventPriority.Medium, EventPriority.High]}
          updateSelectedOptions={(options: number[]) => selectHandler('update-priority', options)}
        />

        <TextField
          id="title-desc"
          label="Text filter"
          variant="outlined"
          onChange={(event: ChangeEvent<HTMLInputElement>) => filtersDispatch({ type: 'update-free-text', payload: event.target.value })}
        />
      </div>
    </>
  )
}