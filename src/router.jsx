import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import EditDetailPage from "./pages/EditDetailPage.jsx";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetailPage.jsx";
import NewEventPage from "./pages/NewEventPage.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage.jsx";
import EventsRootLayout from "./pages/EventsRootLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { action as manipulateEventAction } from "./components/EventForm.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="events" element={<EventsRootLayout />}>
        <Route index element={<EventsPage />} loader={eventsLoader} />
        <Route path=":eventId" loader={eventDetailLoader} id="event-detail">
          <Route
            index
            element={<EventDetailPage />}
            action={deleteEventAction}
          />
          <Route
            path="edit"
            element={<EditDetailPage />}
            action={manipulateEventAction}
          />
        </Route>
        <Route
          path="new"
          element={<NewEventPage />}
          action={manipulateEventAction}
        />
      </Route>
    </Route>
  )
);
