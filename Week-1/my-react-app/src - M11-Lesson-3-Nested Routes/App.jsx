// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Settings from './Settings';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* 🔁 Redirect "/" to "/profile" to trigger NavLink highlighting */}
          <Route index element={<Navigate to="settings" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
