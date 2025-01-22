import c from './AnalyticsFilters.module.scss';
import { useAnalyticsFilters, useAnalyticsFiltersDispatch } from "../../contexts/analytics-filters-context";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import { eventTypeNumOptions } from '../../constants/event-constants';
import MonthYearPicker from '../../shared/components/date-pickers/MonthYearPicker';
import { TextField } from '@mui/material';

export default function AnalyticsFilters() {
  const filters = useAnalyticsFilters();
  const filtersDispatch = useAnalyticsFiltersDispatch();

  const updateFromDateHandler = (fromDate: Date | null) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date | null) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const updateTypeHandler = (eventTypeId: string | null) => filtersDispatch({ type: 'update-event-type-id', payload: eventTypeId });
  const updateLatitude = (latitude?: number) => filtersDispatch({ type: 'update-latitude', payload: latitude });
  const updateLongitude = (longitude?: number) => filtersDispatch({ type: 'update-longitude', payload: longitude });
  const updateRadius = (radius?: number) => filtersDispatch({ type: 'update-latitude', payload: radius });

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
          <TextField
            id="latitude"
            label="Latitude"
            type="number"
            variant="outlined"
            onChange={(e) => updateLatitude(Number(e.target.value))}
            sx={{ width: "320px" }}
          />
        </div>

        <div>
          <TextField
            id="longitude"
            label="Longitude"
            type="number"
            variant="outlined"
            onChange={(e) => updateLongitude(Number(e.target.value))}
            sx={{ width: "320px" }}
          />
        </div>

        <div>
          <TextField
            id="longitude"
            label="Radius"
            type="number"
            variant="outlined"
            onChange={(e) => updateRadius(Number(e.target.value))}
            sx={{ width: "320px" }}
          />
        </div>
      </div>
    </>
  )
}