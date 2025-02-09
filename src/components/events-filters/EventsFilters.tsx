import c from "./EventsFilters.module.scss";
import { eventPriorityNumOptions, eventStatusNumOptions } from "../../constants/event-constants";
import { useEventsFilters, useEventsFiltersDispatch } from "../../contexts/events-filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";
import { FilterParent } from "../../enums/FilterParent";
import { IOptionStr } from "../../types/IOptionStr";
import { fetchEventTypes } from "../../query/events/fetchEventTypes";
import MultipleSelectCheckmarksStr from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarksStr";
import { useQuery } from "@tanstack/react-query";
import { IEventsFiltersProps } from "../../types/IEventsFiltersProps";
import LocationFilter from "../../shared/components/location-filter/LocationFilter";


export default function EventsFilters({ isShowMap, setIsShowMap }: IEventsFiltersProps) {
  const filters = useEventsFilters();
  const filtersDispatch = useEventsFiltersDispatch();

  const { data: eventTypes, } = useQuery<IOptionStr[]>({
    queryKey: ['event-types'],
    queryFn: ({ signal }) => fetchEventTypes(signal),
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  // TODO filter: location
  const fromDateChangeHandler = (fromDate: Date | null) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const toDateChangeHandler = (toDate: Date | null) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const selectChangeHandler = (dispatchType: string, options: number[]) => filtersDispatch({ type: dispatchType, payload: options });
  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => filtersDispatch({ type: 'update-free-text', payload: event.target.value });
  const updateTypesHandler = (eventTypeIds: Array<string> | null) => filtersDispatch({ type: 'update-event-type-ids', payload: eventTypeIds });
  const deleteCenterHandler = () => {
    filtersDispatch({ type: 'update-lng-lat', payload: { lat: undefined, lng: undefined, radius: undefined } });
    setIsShowMap(false);
  }
  const radiusSliderChange = (_event: Event, newValue: number | number[]) => filtersDispatch({ type: 'update-radius', payload: newValue as number });
  const radiusInputChange = (event: ChangeEvent<HTMLInputElement>) => filtersDispatch({ type: 'update-radius', payload: event.target.value === '' ? 100 : Number(event.target.value) });


  return (
    <>
      <div className={c.relativeContainer}>
        <div className={c.scrollContainer}>
          <div className={c.filtersContainer}>
            <MultipleSelectCheckmarksStr
              options={eventTypes ?? []}
              buttonText='Types'
              defaultOptions={filters.eventTypeIds ?? []}
              width={'150px'}
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

            <div className={c.locationContainer}>
              <LocationFilter
                isShowMap={isShowMap}
                lat={filters.lat}
                long={filters.long}
                radius={filters.radius}
                setIsShowMap={setIsShowMap}
                deleteCenterHandler={deleteCenterHandler}
                radiusSliderChange={radiusSliderChange}
                radiusInputChange={radiusInputChange}
                buttonText="Location"
                isVertical={false}
              />
            </div >

            <MultipleSelectCheckmarks
              buttonText='Priority'
              options={eventPriorityNumOptions}
              defaultOptions={filters?.priority ?? []}
              width={'150px'}
              parent={FilterParent.Videos}
              updateSelectedOptions={(options: number[]) => selectChangeHandler('update-priority', options)}
            />

            <TextField
              id="title-desc"
              label="Texts filter"
              variant="outlined"
              onChange={textChangeHandler}
              sx={{ minWidth: '250px', maxWidth: '300px' }}
              size="medium"
            />

            <MultipleSelectCheckmarks
              buttonText='Status'
              options={eventStatusNumOptions}
              defaultOptions={filters?.statuses ?? []}
              width={'150px'}
              parent={FilterParent.Videos}
              updateSelectedOptions={(options: number[]) => selectChangeHandler('update-status', options)}
            />
          </div>
        </div>
      </div>
    </>
  )
}