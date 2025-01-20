import c from './AnalyticsFilters.module.scss';
import { useAnalyticsFilters, useAnalyticsFiltersDispatch } from "../../contexts/analytics-filters-context";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import { eventTypeNumOptions } from '../../constants/event-constants';
import MonthYearPicker from '../../shared/components/date-pickers/MonthYearPicker';

export default function AnalyticsFilters() {
  const filters = useAnalyticsFilters();
  const filtersDispatch = useAnalyticsFiltersDispatch();

  const updateFromDateHandler = (fromDate: Date | null) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date | null) => filtersDispatch({ type: 'update-to-date', payload: toDate });

  function updateTypeHandler(eventTypeId: string | number | null) {
    if (typeof eventTypeId === 'number') {
      filtersDispatch({ type: 'update-event-type-id', payload: eventTypeId });
    }
  }

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
          options={eventTypeNumOptions}
          checkedId={filters.eventTypeId ?? null}
          update={updateTypeHandler}
          isDisabled={false}
          label='Event type'
          width={'320px'}
          size='medium'
        />

        <div>
          <label htmlFor="lat">Latitude: </label>
          <input type="number" id="lat" />
        </div>

        <div>
          <label htmlFor="long">Longitude: </label>
          <input type="number" id="long" />
        </div>

        <div>
          <label htmlFor="radius">Radius: </label>
          <input type="number" id="radius" />
        </div>
      </div>
    </>
  )
}