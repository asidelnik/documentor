import c from "./VideosFilters.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";
import { LocationOption } from "../../types/location";
import { ChangeEvent, useState } from "react";
import { locationOptions } from "../../fake-data/fake-data";
import { tryParseIntOrUndefined } from "../../utils/functions";
import { IGetVideosFilters } from "../../types/IGetVideosFilters";
import { IVideosFiltersProps } from "../../props/IVideosFiltersProps";
import { statusAutocompleteOptions, VideoStatusEnum } from "../../constants/video-status";
import MultipleSelectCheckmarks from "../../shared/components/multiple-select-checkmarks/MultipleSelectCheckmarks";

export default function VideosFilters({ defaultFilters, fetchData }: IVideosFiltersProps) {
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);
  const [filters, setFilters] = useState<IGetVideosFilters>(defaultFilters);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  }

  const handleSearch = (event: any) => {
    if (event.key === 'Enter') {
      fetchData(filters);
    }
  }

  const handleSearchClick = () => {
    fetchData(filters);
  }

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const locationId = tryParseIntOrUndefined(event.target.value);
    if (locationId === undefined) return;
    setSelectedLocation(locationId);
    const location = locationOptions.find(x => x.id == locationId);
    if (!location) return;
    setFilters(prevFilters => ({
      ...prevFilters,
      lat: location?.value.lat,
      lng: location?.value.lng,
    }));
  };

  function selectHandler(fieldName: string, options: number[]) {
    const newFilters = {
      ...filters,
      [fieldName]: options,
    };
    fetchData(newFilters);
    setFilters(newFilters);
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
            onChange={handleFilterChange}
            onKeyDown={handleSearch}
          />
          <input
            type="datetime-local"
            name="toDate"
            placeholder="To date"
            value={filters.toDate}
            onChange={handleFilterChange}
            onKeyDown={handleSearch}
          />

          <select name="location" value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Select Location</option>
            {locationOptions.map((option: LocationOption, index: number) => (
              <option key={index} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          <MultipleSelectCheckmarks
            buttonText='Statuses'
            options={statusAutocompleteOptions}
            defaultOptions={[VideoStatusEnum.Unprocessed, VideoStatusEnum.Usable, VideoStatusEnum.Restricted]}
            updateSelectedOptions={(options: number[]) => selectHandler('statuses', options)}
          />

          {/* <input type="text" name="tags" value={filters.tags} onChange={handleFilterChange} /> */}

          <IconButton aria-label="search" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </form>
      </div>
    </>
  )
}