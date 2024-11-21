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


export const router = createHashRouter(
  createRoutesFromElements(
    <Route
      path="/"
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
      {/* <Route
        path="/events/:eventId"
        element={<EventTimelinePage />}
        errorElement={<MainErrorBoundary />}
      /> */}
      {/* <Route
        path="/graphs-page"
        element={<GraphsPage />}
      /> */}

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Route>
  )
);
