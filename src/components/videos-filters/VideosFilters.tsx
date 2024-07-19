import c from "./VideosFilters.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";
import { LocationOption } from "../../types/location";
import { ChangeEvent, useState } from "react";
import { locationOptions } from "../../fake-data/fake-data";
import { tryParseIntOrUndefined } from "../../utils/functions";
import { GetVideosQueryParams } from "../../types/getVideosQueryParams";
import { VideosFiltersProps } from "../../props/VideosFiltersProps";

export default function VideosFilters({ defaultFilters, fetchData }: VideosFiltersProps) {
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);
  const [filters, setFilters] = useState<GetVideosQueryParams>(defaultFilters);

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

          <input
            type="number"
            name="status"
            placeholder="Status"
            value={filters.status}
            onChange={handleFilterChange}
            onKeyDown={handleSearch}
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