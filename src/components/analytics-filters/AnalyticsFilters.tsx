import c from './AnalyticsFilters.module.scss';
import { useAnalyticsFilters, useAnalyticsFiltersDispatch } from "../../contexts/analytics-filters-context";
import MonthYearPicker from '../../shared/components/date-pickers/MonthYearPicker';
import { fetchEventTypes } from '../../query/events/fetchEventTypes';
import { IOptionStr } from '../../types/IOptionStr';
import { ChangeEvent } from 'react';
import { IAnalyticsFiltersProps } from '../../types/IAnalyticsFiltersProps';
import LocationFilter from '../../shared/components/location-filter/LocationFilter';
import { FilterParent } from '../../enums/FilterParent';
import MultipleSelectCheckmarksStr from '../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarksStr';
import { useQuery } from '@tanstack/react-query';

export default function AnalyticsFilters({ isShowMap, setIsShowMap }: IAnalyticsFiltersProps) {
  const filters = useAnalyticsFilters();
  const filtersDispatch = useAnalyticsFiltersDispatch();

  const { data: eventTypes, } = useQuery<IOptionStr[]>({
    queryKey: ['event-types'],
    queryFn: ({ signal }) => fetchEventTypes(signal),
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  const updateFromDateHandler = (fromDate: Date | null) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date | null) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const updateTypesHandler = (eventTypeIds: Array<string> | null) => filtersDispatch({ type: 'update-event-type-ids', payload: eventTypeIds });
  const deleteCenterHandler = () => {
    filtersDispatch({ type: 'update-lng-lat', payload: { lat: undefined, lng: undefined, radius: undefined } });
    setIsShowMap(false);
  }
  const radiusSliderChange = (_event: Event, newValue: number | number[]) => filtersDispatch({ type: 'update-radius', payload: newValue as number });
  const radiusInputChange = (event: ChangeEvent<HTMLInputElement>) => filtersDispatch({ type: 'update-radius', payload: event.target.value === '' ? 100 : Number(event.target.value) });

  return (
    <>
      <div className={c.filtersContainer}>
        <div className={c.rangeContainer}>
          <MonthYearPicker
            fromDateProp={filters.fromDate}
            toDateProp={filters.toDate}
            updateFromDate={updateFromDateHandler}
            updateToDate={updateToDateHandler}
          />
        </div>

        <MultipleSelectCheckmarksStr
          options={eventTypes ?? []}
          buttonText='Event types'
          defaultOptions={filters.eventTypeIds ?? []}
          width={'320px'}
          parent={FilterParent.Videos}
          updateSelectedOptions={updateTypesHandler}
        />

        <div className={c.locationContainer}>
          <h4>Location filter</h4>
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
            isVertical={true}
          />
        </div>
      </div >
    </>
  )
}