// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage

// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import EditDetailPage from "./pages/EditDetailPage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";
import NewEventPage from "./pages/NewEventPage.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import EventsRootLayout from "./pages/EventsRootLayout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<EventsRootLayout />}>
          <Route
            path=""
            element={<EventsPage />}
            loader={async () => {
              const response = await fetch("http://localhost:8080/events");
              if (!response.ok) {
                // 오류 메세지
              } else {
                const resData = await response.json();
                return resData.events;
              }
            }}
          />
          <Route path=":eventId" element={<EventDetailPage />} />
          <Route path="new" element={<NewEventPage />} />
          <Route path=":eventId/edit" element={<EditDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
