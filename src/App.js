import React from 'react';
import './App.css';
import { VolunteerView } from './VolunteerView';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import { VolunteerForm } from './VolunteerForm';
import { EventView } from './EventView';
import { EventForm } from './EventForm';

function App() {
  return (
    <div className="App">
      <h2>We will learn Redux toolkit</h2>
      <Router>

      <nav>
        <NavLink to="/" >Volunteers</NavLink>
        <NavLink to="/events">Events</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<VolunteerView />} />
        <Route path="/volunteers/add" element={<VolunteerForm />} />
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
