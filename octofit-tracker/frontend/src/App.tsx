import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

export default function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">
          Fetches the backend through direct <code>/api/*</code> routes. Vite proxies
          these requests to the backend on port 8000 during development.
        </p>
      </header>

      <nav className="nav nav-pills mb-4">
        <NavLink to="/" className="nav-link" end>
          Home
        </NavLink>
        <NavLink to="/users" className="nav-link">
          Users
        </NavLink>
        <NavLink to="/teams" className="nav-link">
          Teams
        </NavLink>
        <NavLink to="/activities" className="nav-link">
          Activities
        </NavLink>
        <NavLink to="/leaderboard" className="nav-link">
          Leaderboard
        </NavLink>
        <NavLink to="/workouts" className="nav-link">
          Workouts
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>Welcome to OctoFit Tracker</h2>
              <p>Use the navigation to view users, teams, activities, leaderboard, and workouts.</p>
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}
