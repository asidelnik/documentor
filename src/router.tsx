import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import EventsTablePage from "./pages/EventsTablePage";
// import EventTimelinePage from "./pages/EventTimelinePage";
import NotFoundPage from "./pages/NotFoundPage";
import VideosPage from "./pages/videos-page/VideosPage";
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
        element={<EventsTablePage />}
        errorElement={<MainErrorBoundary />}
      />
      <Route
        path="/events"
        element={<EventsTablePage />}
        errorElement={<MainErrorBoundary />}
      />
      <Route
        path="/videos"
      >
        <Route
          index={true}
          element={<VideosPage />}
          errorElement={<MainErrorBoundary />}
        />
        <Route
          path="update-event-videos"
          element={<VideosPage />}
          errorElement={<MainErrorBoundary />}
        />
        <Route
          path="add-videos-to-event/:eventTitle/:eventId"
          element={<VideosPage />}
          errorElement={<MainErrorBoundary />}
        />
      </Route>

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