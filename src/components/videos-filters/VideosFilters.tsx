import c from "./VideosFilters.module.scss";
import { ChangeEvent } from "react";
import { eventStatusNumOptions } from "../../constants/video-status";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import ComboBox from "../../shared/components/combo-box/ComboBox";
import { IVideoFiltersProps } from "../../props/IVideoFiltersProps";
import { FilterParent } from "../../enums/FilterParent";
import LocationFilter from "../../shared/components/location-filter/LocationFilter";
import { useVideosFilters } from "../../contexts/videos/useVideosFilters";
import { useVideosFiltersDispatch } from "../../contexts/videos/useVideosFiltersDispatch";

export default function VideosFilters({ eventsData, isShowMap, setIsShowMap }: IVideoFiltersProps) {
  const filters = useVideosFilters();
  const filtersDispatch = useVideosFiltersDispatch();

  const updateFromDateHandler = (fromDate: Date | null) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date | null) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const selectHandler = (dispatchType: string, options: number[]) => filtersDispatch({ type: dispatchType, payload: options });
  const eventFilterHandler = (newEventId: string | null) => filtersDispatch({ type: 'update-event-id', payload: newEventId });
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
          <DateTimeRangePicker
            fromDateProp={filters.fromDate}
            toDateProp={filters.toDate}
            parent={FilterParent.Videos}
            updateFromDate={updateFromDateHandler}
            updateToDate={updateToDateHandler}
          />
        </div>

        <MultipleSelectCheckmarks
          buttonText='Status'
          options={eventStatusNumOptions}
          defaultOptions={filters?.statuses ?? []}
          width={'320px'}
          parent={FilterParent.Videos}
          updateSelectedOptions={(options: number[]) => selectHandler('update-statuses', options)}
        />

        <ComboBox
          options={eventsData.events}
          checkedId={filters.eventId ?? null}
          update={eventFilterHandler}
          isDisabled={eventsData.events.length <= 0}
          label='Event'
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
            buttonText="Location"
            isVertical={true}
          />
        </div>
      </div>
    </>
  )
}