// Packages
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
// Pages
import EventsTablePage from "./pages/EventsTablePage";
// import EventTimelinePage from "./pages/EventTimelinePage";
import NotFoundPage from "./pages/NotFoundPage";
import AllVideosPage from "./pages/all-videos-page/AllVideosPage";
import MainErrorBoundary from "./error-boundaries/MainErrorBoundary";
import EventPage from "./pages/event-page/EventPage";
import AnalyticsPage from "./pages/analytics-page/AnalyticsPage";


export const router = createHashRouter(
  createRoutesFromElements(
    <Route
      element={<RootLayout />}
    >
      <Route
        path="/"
        element={<AllVideosPage />}
        errorElement={<MainErrorBoundary />}
      />
      <Route
        path="/videos"
        element={<AllVideosPage />}
        errorElement={<MainErrorBoundary />}
      />
      <Route
        path="/events"
        element={<EventsTablePage />}
        errorElement={<MainErrorBoundary />}
      />
      <Route
        path="/events/:eventId"
        element={<EventPage />}
        errorElement={<MainErrorBoundary />}
      />
      <Route
        path="/analytics"
        element={<AnalyticsPage />}
        errorElement={<MainErrorBoundary />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Route>
  )
);

// https://github.com/users/asidelnik/projects/1/views/4?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C123711051%2C%22Status%22%2C%22Labels%22%2C127418281%2C123703153%2C123703344%2C158375412%5D&pane=issue&itemId=92394007&issue=asidelnik%7Cdocumentor%7C115