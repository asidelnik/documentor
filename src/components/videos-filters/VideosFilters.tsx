import c from "./VideosFilters.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";
// import { LocationOption } from "../../types/location";
import { ChangeEvent, useEffect } from "react";
// import { locationOptions } from "../../fake-data/fake-data";
// import { tryParseIntOrUndefined } from "../../utils/functions";
import { IVideosFiltersProps } from "../../props/IVideosFiltersProps";
import { statusAutocompleteOptions, VideoStatusEnum } from "../../constants/video-status";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";
import { useFilters, useFiltersDispatch } from "../../contexts/filters-context";

export default function VideosFilters({ fetchData }: IVideosFiltersProps) {
  // const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);
  const filters = useFilters();
  const filtersDispatch = useFiltersDispatch();

  useEffect(() => {
    fetchData();
  }, [filters])

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>, dispatchType: string,) => {
    filtersDispatch({ type: dispatchType, payload: event.target });
  }

  const handleSearch = (event: any) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  }

  const handleSearchClick = () => {
    fetchData();
  }

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

  function selectHandler(dispatchType: string, options: number[]) {
    filtersDispatch({ type: dispatchType, payload: options });
  }

  return (
    <>
      <div className={c.filtersContainer}>
        <form>
          <input
            type="datetime-local"
            name="fromDate"
            placeholder="From date"
            value={filters.fromDate}
            onChange={(event) => handleFilterChange(event, 'from-date-update')}
            onKeyDown={handleSearch}
          />
          <input
            type="datetime-local"
            name="toDate"
            placeholder="To date"
            value={filters.toDate}
            onChange={(event) => handleFilterChange(event, 'to-date-update')}
            onKeyDown={handleSearch}
          />

          {/* <select name="location" value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Select Location</option>
            {locationOptions.map((option: LocationOption, index: number) => (
              <option key={index} value={option.id}>
                {option.label}
              </option>
            ))}
          </select> */}

          <MultipleSelectCheckmarks
            buttonText='Statuses'
            options={statusAutocompleteOptions}
            defaultOptions={[VideoStatusEnum.Unprocessed, VideoStatusEnum.Usable, VideoStatusEnum.Restricted]}
            updateSelectedOptions={(options: number[]) => selectHandler('update-statuses', options)}
          />

          <IconButton aria-label="search" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </form>
      </div>
    </>
  )
}