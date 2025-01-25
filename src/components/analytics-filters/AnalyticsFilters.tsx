import c from './AnalyticsFilters.module.scss';
import { useAnalyticsFilters, useAnalyticsFiltersDispatch } from "../../contexts/analytics-filters-context";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import MonthYearPicker from '../../shared/components/date-pickers/MonthYearPicker';
import { TextField } from '@mui/material';
import { fetchEventTypes } from '../../query/events/fetchEventTypes';
import { IOptionStr } from '../../types/IOptionStr';
import { useEffect, useState } from 'react';

export default function AnalyticsFilters() {
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
          options={eventTypes}
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