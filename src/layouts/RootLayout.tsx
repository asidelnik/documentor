import { Outlet } from "react-router-dom";
import RootHeader from "../headers/RootHeader";
import { FiltersProvider } from "../contexts/filters-context";
import { EventsFiltersProvider } from "../contexts/events-filters-context";

export default function RootLayout() {
  return (
    <>
      <EventsFiltersProvider>
        <FiltersProvider>
          <RootHeader />
          <Outlet />
        </FiltersProvider>
      </EventsFiltersProvider>
    </>
  );
}
