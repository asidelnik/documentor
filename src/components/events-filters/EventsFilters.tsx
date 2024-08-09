import { useEventsFilters, useEventsFiltersDispatch } from "../../contexts/events-filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";

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
  return (
    <>
      {/* <div className={c.filtersContainer}> */}
      <DateTimeRangePicker
        fromDateProp={eventsFilters.fromDate}
        toDateProp={eventsFilters.toDate}
        updateFromDate={updateFromDateHandler}
        updateToDate={updateToDateHandler}
      />
      {/* </div> */}
    </>
  )
}