import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import EditDetailPage from "./pages/EditDetailPage.jsx";
import EventDetailPage, {
  loader as eventDetailLoader,
} from "./pages/EventDetailPage.jsx";
import NewEventPage from "./pages/NewEventPage.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage.jsx";
import EventsRootLayout from "./pages/EventsRootLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="events" element={<EventsRootLayout />}>
        <Route index path="" element={<EventsPage />} loader={eventsLoader} />
        <Route
          path=":eventId"
          element={<EventDetailPage />}
          loader={eventDetailLoader}
        />
        <Route path="new" element={<NewEventPage />} />
        <Route path=":eventId/edit" element={<EditDetailPage />} />
      </Route>
    </Route>
  )
);
