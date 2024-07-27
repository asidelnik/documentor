import c from "./VideosFilters.module.scss";
// import { LocationOption } from "../../types/location";
import { useEffect, useState } from "react"; //ChangeEvent
// import { locationOptions } from "../../fake-data/fake-data";
// import { tryParseIntOrUndefined } from "../../utils/functions";
import { IVideosFiltersProps } from "../../props/IVideosFiltersProps";
import { statusAutocompleteOptions, VideoStatusEnum } from "../../constants/video-status";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";
import { useFilters, useFiltersDispatch } from "../../contexts/filters-context";
import DateTimeRangePicker from "../../shared/components/date-time-range-picker/DateTimeRangePicker";

export default function VideosFilters({ fetchData }: IVideosFiltersProps) {
  // const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);
  const filters = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const [isValidationError, setIsValidationError] = useState<boolean>(false);

  useEffect(() => {
    if (!isValidationError) fetchData();
  }, [filters.fromDate, filters.toDate, filters.statuses])

  // const handleSearch = (event: any) => {
  //   if (event.key === 'Enter') {
  //     fetchData();
  //   }
  // }

  function selectHandler(dispatchType: string, options: number[]) {
    filtersDispatch({ type: dispatchType, payload: options });
  }

  return (
    <>
      <div className={c.filtersContainer}>
          <DateTimeRangePicker
            fromDateProp={filters.fromDate}
            toDateProp={filters.toDate}
            updateFromDate={(date: Date) => filtersDispatch({ type: 'update-from-date', payload: date })}
            updateToDate={(date: Date) => filtersDispatch({ type: 'update-to-date', payload: date })}
            setValidationError={setIsValidationError}
          />

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