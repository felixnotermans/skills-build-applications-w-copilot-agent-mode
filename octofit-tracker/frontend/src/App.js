import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="app-shell">
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h1 className="display-6 fw-semibold mb-0">OctoFit Tracker</h1>
          <a className="link-light text-decoration-none" href="/api/" target="_blank" rel="noreferrer">
            Open API root
          </a>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded-3 shadow-sm mb-4 px-3">
          <span className="navbar-brand fw-semibold mb-0 h1">Navigation</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <div className="navbar-nav ms-lg-2">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link px-3${isActive ? ' active' : ''}`}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
