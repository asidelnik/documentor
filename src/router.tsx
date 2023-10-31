// Packages
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
// Pages
import AllVideosPage from "./pages/AllVideosPage";
import EventsTablePage from "./pages/EventsTablePage";
import EventTimelinePage from "./pages/EventTimelinePage";
import NotFoundPage from "./pages/NotFoundPage";


export const router = createHashRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
    >
      <Route
        path="/"
        element={<AllVideosPage />}
      />
      <Route
        path="/all-videos"
        element={<AllVideosPage />}
      />
      <Route
        path="/events"
        element={<EventsTablePage />}
      />
      <Route
        path="/events/:eventId"
        element={<EventTimelinePage />}
      />
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
