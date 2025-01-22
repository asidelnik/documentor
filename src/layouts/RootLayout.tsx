import { Outlet } from "react-router-dom";
import RootHeader from "../headers/RootHeader";
import { FiltersProvider } from "../contexts/filters-context";
import { EventsFiltersProvider } from "../contexts/events-filters-context";
import { AnalyticsFiltersProvider } from "../contexts/analytics-filters-context";

export default function RootLayout() {
  return (
    <>
      <EventsFiltersProvider>
        <FiltersProvider>
          <AnalyticsFiltersProvider>
            <RootHeader />
            <Outlet />
          </AnalyticsFiltersProvider>
        </FiltersProvider>
      </EventsFiltersProvider>
    </>
  );
}
