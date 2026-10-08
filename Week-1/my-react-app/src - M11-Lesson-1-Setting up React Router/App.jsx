import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Importing all components
import Home from './Home';
import About from './About';
import Contact from './Contact';
import NotFound from './NotFound';

import Dashboard from './Dashboard';
import DashboardHome from './DashboardHome';
import Profile from './Profile';
import Settings from './Settings';
//-----------------------------------

function App() {
  return (
    <Router>
      <div className="app">
        <header className="navbar">
          <div className="navbar-logo">🚀 ReactSite</div>

          <nav>
            <ul className="nav-links">
              {/* 1. Changed '/' Link to go to the intended Home page */}
              <li><Link to="/" className="nav-item">Home</Link></li>

              {/* 2. Added the top-level Dashboard link. It will render the Dashboard component, which, in turn, renders the index route (DashboardHome) via <Outlet /> */}
              <li><Link to="/dashboard" className="nav-item">Dashboard</Link></li>

              {/* 3. Changed absolute paths to the correct nested paths for Profile and Settings */}
              <li><Link to="/dashboard/profile" className="nav-item">Profile</Link></li>
              <li><Link to="/dashboard/settings" className="nav-item">Settings</Link></li>

              {/* Added other navigation links back for completeness */}
              <li><Link to="/about" className="nav-item">About</Link></li>
              <li><Link to="/contact" className="nav-item">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main className="content">
          <Routes>
            {/* 4. Restored the top-level routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Dashboard nested routes. This structure is correct. */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch-all route for any other path */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} ReactSite. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;