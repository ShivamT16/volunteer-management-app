import React from 'react';
import './App.css';
import { VolunteerView } from './VolunteerView';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import { VolunteerForm } from './VolunteerForm';

function App() {
  return (
    <div className="App">
      <h2>We will learn Redux toolkit</h2>
      <Router>

      <nav>
        <NavLink to="/" >Volunteers</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<VolunteerView />} />
        <Route path="/volunteers/add" element={<VolunteerForm />} />
        <Route path="/volunteers/update/:id" element={<VolunteerForm />} />
      </Routes>

      </Router>
    </div>
  );
}

export default App;
