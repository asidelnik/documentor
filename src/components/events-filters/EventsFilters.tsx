import c from "./EventsFilters.module.scss";
import { eventPriorityNumOptions, eventStatusNumOptions } from "../../constants/event-constants";
import { useEventsFilters, useEventsFiltersDispatch } from "../../contexts/events-filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { FilterParent } from "../../enums/FilterParent";
import { IOptionStr } from "../../types/IOptionStr";
import { fetchEventTypes } from "../../query/events/fetchEventTypes";
import MultipleSelectCheckmarksStr from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarksStr";

export default function EventsFilters() {
  const filters = useEventsFilters();
  const filtersDispatch = useEventsFiltersDispatch();
  const [eventTypes, setEventTypes] = useState<Array<IOptionStr>>([]);

  // Issue #159 - Replace with Tanstack query - useQuery({ queryKey: ['eventTypes'], queryFn: fetchEventTypes })
  useEffect(() => {
    const fetchController = new AbortController();
    const signal = fetchController.signal;
    fetchEventTypes(signal).then((data: Array<IOptionStr>) => setEventTypes(data));
    return () => fetchController.abort();
  }, []);

  // TODO filter: location
  const fromDateChangeHandler = (fromDate: Date | null) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const toDateChangeHandler = (toDate: Date | null) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const selectChangeHandler = (dispatchType: string, options: number[]) => filtersDispatch({ type: dispatchType, payload: options });
  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => filtersDispatch({ type: 'update-free-text', payload: event.target.value });
  const updateTypesHandler = (eventTypeIds: Array<string> | null) => filtersDispatch({ type: 'update-event-type-ids', payload: eventTypeIds });

  return (
    <>
      <div className={c.filtersContainer}>
        <MultipleSelectCheckmarksStr
          options={eventTypes}
          buttonText='Types'
          defaultOptions={filters.eventTypeIds ?? []}
          width={'220px'}
          parent={FilterParent.Videos}
          updateSelectedOptions={updateTypesHandler}
        />

        <DateTimeRangePicker
          fromDateProp={filters.fromDate}
          toDateProp={filters.toDate}
          parent={FilterParent.Videos}
          updateFromDate={fromDateChangeHandler}
          updateToDate={toDateChangeHandler}
        />

        <MultipleSelectCheckmarks
          buttonText='Priority'
          options={eventPriorityNumOptions}
          defaultOptions={filters?.priority ?? []}
          width={'240px'}
          parent={FilterParent.Videos}
          updateSelectedOptions={(options: number[]) => selectChangeHandler('update-priority', options)}
        />

        <TextField
          id="title-desc"
          label="Texts filter"
          variant="outlined"
          onChange={textChangeHandler}
          sx={{ width: '300px' }}
          size="medium"
        />

        <MultipleSelectCheckmarks
          buttonText='Status'
          options={eventStatusNumOptions}
          defaultOptions={filters?.statuses ?? []}
          width={'220px'}
          parent={FilterParent.Videos}
          updateSelectedOptions={(options: number[]) => selectChangeHandler('update-status', options)}
        />
      </div>
    </>
  )
}