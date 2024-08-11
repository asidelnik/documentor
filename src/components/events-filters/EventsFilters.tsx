import c from "./EventsFilters.module.scss";
import { eventAutocompleteOptions, EventPriority } from "../../constants/event-constants";
import { useEventsFilters, useEventsFiltersDispatch } from "../../contexts/events-filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";

export default function EventsFilters() {
  const filters = useEventsFilters();
  const filtersDispatch = useEventsFiltersDispatch();
  console.log(filters);

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
          options={eventAutocompleteOptions}
          defaultOptions={[EventPriority.Low, EventPriority.Medium, EventPriority.High]}
          updateSelectedOptions={(options: number[]) => selectHandler('update-priority', options)}
        />
      </div>
    </>
  )
}