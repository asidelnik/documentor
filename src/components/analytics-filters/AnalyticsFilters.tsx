import c from './AnalyticsFilters.module.scss';
import { useAnalyticsFilters, useAnalyticsFiltersDispatch } from "../../contexts/analytics-filters-context";
import CheckboxesTags from "../../shared/components/checkbox-tags/CheckboxTags";
import MonthYearPicker from '../../shared/components/date-pickers/MonthYearPicker';
import { Button, IconButton, Input, Slider, TextField, Tooltip } from '@mui/material';
import { fetchEventTypes } from '../../query/events/fetchEventTypes';
import { IOptionStr } from '../../types/IOptionStr';
import { ChangeEvent, useEffect, useState } from 'react';
import { IAnalyticsFiltersProps } from '../../types/IAnalyticsFiltersProps';
import CloseIcon from '@mui/icons-material/Close';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function AnalyticsFilters({ isShowMap, setIsShowMap }: IAnalyticsFiltersProps) {
  const filters = useAnalyticsFilters();
  const filtersDispatch = useAnalyticsFiltersDispatch();
  const [eventTypes, setEventTypes] = useState<Array<IOptionStr>>([]);
  const [isShowLocationFields, setIsShowLocationFields] = useState<boolean>(false);

  useEffect(() => {
    const fetchController = new AbortController();
    const signal = fetchController.signal;
    fetchEventTypes(signal).then((data: Array<IOptionStr>) => setEventTypes(data));
    return () => fetchController.abort();
  }, []);

  useEffect(() => {
    if (filters.lat && filters.long) {
      setIsShowLocationFields(true);
    } else {
      setIsShowLocationFields(false);
    }
  }, [filters.lat, filters.long]);

  const updateFromDateHandler = (fromDate: Date | null) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date | null) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const updateTypeHandler = (eventTypeId: string | null) => filtersDispatch({ type: 'update-event-type-id', payload: eventTypeId });
  const deleteCenterHandler = () => {
    filtersDispatch({ type: 'update-lng-lat', payload: { lat: null, lng: null, radius: null } });
    setIsShowMap(false);
  }

  const handleSliderChange = (_event: Event, newValue: number | number[]) => filtersDispatch({ type: 'update-radius', payload: newValue as number });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => filtersDispatch({ type: 'update-radius', payload: event.target.value === '' ? 100 : Number(event.target.value) });

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
          <div className={c.main}>
            <div className={c.buttons}>
              <Button
                onClick={() => setIsShowMap(!isShowMap)}
                className={c.showMapButton}
                variant='outlined'>
                {isShowMap ?
                  (<>Close map <CloseIcon sx={{ marginLeft: '6px' }} /></>) :
                  (<>Choose location<MapOutlinedIcon sx={{ marginLeft: '6px' }} /></>)}
              </Button>

              <div className={c.right}>
                {isShowLocationFields &&
                  <IconButton
                    onClick={deleteCenterHandler}
                    aria-label="Delete location filters"
                    color="primary"
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                }

                {(isShowMap || isShowLocationFields) &&
                  <Tooltip title="Click map to set a center marker & drag to move." arrow placement="top" style={{ maxWidth: 'none', textWrap: 'nowrap' }}>
                    <InfoOutlinedIcon />
                  </Tooltip>
                }
              </div>
            </div>


            {isShowLocationFields &&
              <>
              <div>
                <TextField
                  id="latitude"
                  label="Latitude"
                  type="text"
                  variant="outlined"
                  value={filters.lat}
                  sx={{ width: "320px" }}
                  InputLabelProps={{ shrink: true }}
                  disabled={true}
                />
              </div>

              <div>
                <TextField
                  id="longitude"
                  label="Longitude"
                  type="text"
                  variant="outlined"
                  value={filters.long}
                  sx={{ width: "320px" }}
                  InputLabelProps={{ shrink: true }}
                  disabled={true}
                />
              </div>

              <label className={c.label}>Radius</label>
              <div className={c.radiusFields}>
                <Slider
                  value={filters.radius}
                  onChange={handleSliderChange}
                  disabled={!isShowMap}
                  aria-label="Radius slider"
                  defaultValue={500}
                  getAriaValueText={(value) => `${value} m`}
                  valueLabelDisplay="auto"
                  shiftStep={30}
                  step={200}
                  marks
                  min={100}
                  max={4900}
                  sx={{ width: "80%" }}
                />
                <Input
                  value={filters.radius}
                  size="small"
                  onChange={handleInputChange}
                  disabled={!isShowMap}
                  sx={{ width: "20%" }}
                  inputProps={{
                    step: 50,
                    min: 100,
                    max: 4900,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />

              </div>
              </>
            }
          </div>
        </div>
      </div >
    </>
  )
}