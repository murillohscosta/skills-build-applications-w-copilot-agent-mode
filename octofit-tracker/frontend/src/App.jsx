import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Users from './components/Users.jsx';
import Teams from './components/Teams.jsx';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';

const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
const codespaceName =
  typeof rawCodespaceName === 'string' &&
  rawCodespaceName.trim() &&
  rawCodespaceName !== 'undefined'
    ? rawCodespaceName.trim()
    : '';
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export default function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">
          Uses the Vite environment variable <code>VITE_CODESPACE_NAME</code> to build
          the backend API root. Define this variable in <code>.env.local</code> for Codespaces.
        </p>
      </header>

      {!codespaceName && (
        <div className="alert alert-warning">
          <strong>Local fallback:</strong> <code>VITE_CODESPACE_NAME</code> is not set,
          so the app is using <code>{apiBase}</code>.
        </div>
      )}

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
        <Route path="/users" element={<Users apiBase={apiBase} />} />
        <Route path="/teams" element={<Teams apiBase={apiBase} />} />
        <Route path="/activities" element={<Activities apiBase={apiBase} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
        <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
      </Routes>
    </div>
  );
}
