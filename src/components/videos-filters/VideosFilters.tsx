import c from "./VideosFilters.module.scss";
import { eventStatusNumOptions } from "../../constants/video-status";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";
import { useFilters, useFiltersDispatch } from "../../contexts/filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";
import ComboBox from "../../shared/components/combo-box/ComboBox";
import { IVideoFiltersProps } from "../../props/IVideoFiltersProps";
import { FilterParent } from "../../enums/FilterParent";

export default function VideosFilters({ eventsData }: IVideoFiltersProps) {
  const filters = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const updateFromDateHandler = (fromDate: Date | null) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date | null) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const selectHandler = (dispatchType: string, options: number[]) => filtersDispatch({ type: dispatchType, payload: options });
  const eventFilterHandler = (newEventId: string | null) => filtersDispatch({ type: 'update-event-id', payload: newEventId });


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
      </div>
    </>
  )
}


// import { LocationOption } from "../../types/location";
// import { locationOptions } from "../../fake-data/fake-data";
// import { tryParseIntOrUndefined } from "../../utils/functions";

// const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);
{/* <select name="location" value={selectedLocation} onChange={handleLocationChange}>
    <option value="">Select Location</option>
    {locationOptions.map((option: LocationOption, index: number) => (
      <option key={index} value={option.id}>
        {option.label}
      </option>
    ))}
  </select> */}

// const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
//   const locationId = tryParseIntOrUndefined(event.target.value);
//   if (locationId === undefined) return;
//   setSelectedLocation(locationId);
//   const location = locationOptions.find(x => x.id == locationId);
//   if (!location) return;
//   filtersDispatch();
//   setFilters(prevFilters => ({
//     ...prevFilters,
//     lat: location?.value.lat,
//     lng: location?.value.lng,
//   }));
// };