import c from "./VideosFilters.module.scss";
import { statusAutocompleteOptions, VideoStatusEnum } from "../../constants/video-status";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";
import { useFilters, useFiltersDispatch } from "../../contexts/filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";

export default function VideosFilters() {
  const filters = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const updateFromDateHandler = (fromDate: Date) => filtersDispatch({ type: 'update-from-date', payload: fromDate });
  const updateToDateHandler = (toDate: Date) => filtersDispatch({ type: 'update-to-date', payload: toDate });
  const selectHandler = (dispatchType: string, options: number[]) => filtersDispatch({ type: dispatchType, payload: options });


  return (
    <>
      <div className={c.filtersContainer}>
        <div className={c.rangeContainer}>
          <DateTimeRangePicker
            fromDateProp={filters.fromDate}
            toDateProp={filters.toDate}
            updateFromDate={updateFromDateHandler}
            updateToDate={updateToDateHandler}
          />
        </div>

        <MultipleSelectCheckmarks
          buttonText='Statuses'
          options={statusAutocompleteOptions}
          defaultOptions={[VideoStatusEnum.Unprocessed, VideoStatusEnum.Usable, VideoStatusEnum.Restricted]}
          updateSelectedOptions={(options: number[]) => selectHandler('update-statuses', options)}
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