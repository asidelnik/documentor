// Packages
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
// Pages
import VideosProcessingPage from "./pages/VideosProcessingPage";
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
        element={<VideosProcessingPage />}
      />
      <Route
        path="/videos-processing"
        element={<VideosProcessingPage />}
      />
      <Route
        path="/events-table"
        element={<EventsTablePage />}
      />
      <Route
        path="/event-timeline"
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
