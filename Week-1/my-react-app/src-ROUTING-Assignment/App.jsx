import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Company from './components/Company';
import Leadership from './components/Leadership';
import Vision from './components/Vision';
import Products from './components/Products';
import WebApp from './components/WebApp';
import MobileApp from './components/MobileApp';
import ContactUs from './components/ContactUs';
import Profile from './components/Profile';
import SearchResults from './components/SearchResults';
import Details from './components/Details';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { AppContext } from './context/AppContext';

/* import './App.css';
 */
function App() {
  return (
    <AppContext.Provider value={{ user: 'John Doe' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path="company" element={<Company />}>
              <Route index element={<Navigate to="leadership" replace />} />
              <Route path="leadership" element={<Leadership />} />
              <Route path="vision" element={<Vision />} />
            </Route>

            <Route path="products" element={<Products />}>
              <Route path="webapp" element={<WebApp />} />
              <Route path="mobileapp" element={<MobileApp />} />
            </Route>

            <Route path="contact" element={<ContactUs />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="details" element={<Details />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
