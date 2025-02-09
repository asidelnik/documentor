import { Outlet } from "react-router-dom";
import RootHeader from "../headers/RootHeader";
import { VideosFiltersProvider } from "../contexts/videos/VideosFiltersProvider";
import { EventsFiltersProvider } from "../contexts/events/EventsFiltersProvider";
import { AnalyticsFiltersProvider } from "../contexts/analytics/AnalyticsFiltersProvider";

export default function RootLayout() {
  return (
    <>
      <EventsFiltersProvider>
        <VideosFiltersProvider>
          <AnalyticsFiltersProvider>
            <RootHeader />
            <Outlet />
          </AnalyticsFiltersProvider>
        </VideosFiltersProvider>
      </EventsFiltersProvider>
    </>
  );
}
