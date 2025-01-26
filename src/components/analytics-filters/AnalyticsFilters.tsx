import c from './AnalyticsFilters.module.scss';
import { useAnalyticsFilters, useAnalyticsFiltersDispatch } from "../../contexts/analytics-filters-context";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import MonthYearPicker from '../../shared/components/date-pickers/MonthYearPicker';
import { fetchEventTypes } from '../../query/events/fetchEventTypes';
import { IOptionStr } from '../../types/IOptionStr';
import { ChangeEvent, useEffect, useState } from 'react';
import { IAnalyticsFiltersProps } from '../../types/IAnalyticsFiltersProps';
import LocationFilter from '../../shared/components/location-filter/LocationFilter';

export default function AnalyticsFilters({ isShowMap, setIsShowMap }: IAnalyticsFiltersProps) {
  const filters = useAnalyticsFilters();
  const filtersDispatch = useAnalyticsFiltersDispatch();
  const [eventTypes, setEventTypes] = useState<Array<IOptionStr>>([]);


  useEffect(() => {
    const fetchController = new AbortController();
    const signal = fetchController.signal;
    fetchEventTypes(signal).then((data: Array<IOptionStr>) => setEventTypes(data));
    return () => fetchController.abort();
  }, []);



  const updateFromDateHandler = (fromDate: Date | null) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date | null) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const updateTypeHandler = (eventTypeId: string | null) => filtersDispatch({ type: 'update-event-type-id', payload: eventTypeId });
  const deleteCenterHandler = () => {
    filtersDispatch({ type: 'update-lng-lat', payload: { lat: null, lng: null, radius: null } });
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

        <CheckboxesTags
          options={eventTypes}
          checkedId={filters.eventTypeId ?? null}
          update={updateTypeHandler}
          isDisabled={false}
          label='Event type'
          width={'320px'}
          size='medium'
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
          />
        </div>
      </div >
    </>
  )
}