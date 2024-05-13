import React from 'react';
import './App.css';
import { VolunteerView } from './features/volunteer/VolunteerView';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import { VolunteerForm } from './features/volunteer/VolunteerForm';
import { EventView } from './features/event/EventView';
import { EventForm } from './features/event/EventForm';
import { EventSummary } from './features/dashboard/EventSummary';
import { EventDetail } from './features/dashboard/EventDetail';
import { VolunteerDetail } from './features/volunteer/VolunteerDetail';

function App() {
  return (
    <div className="App">
      <Router>
      <nav>
        <h2>Event Management Portal </h2>
        <NavLink className="navLink" to="/" >Dashboard</NavLink>
        <NavLink className="navLink" to="/volunteers" >Volunteers</NavLink>
        <NavLink className="navLink" to="/events">Events</NavLink>
        <NavLink className="navLink" to="https://github.com/ShivamT16/volunteer-management-app" target="_blank" >GitHub</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<EventSummary />} />
        <Route path="/event/:eventName" element={<EventDetail />} />
        <Route path="/volunteers" element={<VolunteerView />} />
        <Route path="/volunteers/add" element={<VolunteerForm />} />
        <Route path="/volunteerDetail/:id" element={<VolunteerDetail />} />
        <Route path="/volunteers/update/:id" element={<VolunteerForm />} />
        <Route path="/events" element={<EventView />} />
        <Route path="/events/add" element={<EventForm />} />
        <Route path="/events/update/:id" element={<EventForm />} />
      </Routes>

      </Router>
    </div>
  );
}

export default App;
