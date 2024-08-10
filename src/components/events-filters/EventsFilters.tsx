import { eventAutocompleteOptions, EventPriority } from "../../constants/event-constants";
import { useEventsFilters, useEventsFiltersDispatch } from "../../contexts/events-filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";

export default function EventsFilters() {
  const eventsFilters = useEventsFilters();
  const eventsFiltersDispatch = useEventsFiltersDispatch();
  /*
  Filters: time period, location, priority, free text on title & description
  Server: 
  UI: 
  */
  const updateFromDateHandler = (fromDate: Date) => eventsFiltersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date) => eventsFiltersDispatch({ type: 'update-to-date', payload: toDate });
  const selectHandler = (dispatchType: string, options: number[]) => eventsFiltersDispatch({ type: dispatchType, payload: options });

  return (
    <>
      {/* <div className={c.filtersContainer}> */}
      <DateTimeRangePicker
        fromDateProp={eventsFilters.fromDate}
        toDateProp={eventsFilters.toDate}
        updateFromDate={updateFromDateHandler}
        updateToDate={updateToDateHandler}
      />

      <MultipleSelectCheckmarks
        buttonText='Priority'
        options={eventAutocompleteOptions}
        defaultOptions={[EventPriority.Low, EventPriority.Medium, EventPriority.High]}
        updateSelectedOptions={(options: number[]) => selectHandler('update-priority', options)}
      />
      {/* </div> */}
    </>
  )
}