// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';
import About from './components/About';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import { DataContext } from './context/DataContext';
import './App.css';
//--------------------- REDUX TOOLKIT ---------------------
/*
REDUX TOOLKIT:
==============
npm install @reduxjs/toolkit react-redux
*/
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import ReduxProfile from './components/ReduxProfile';
import SetUserForm from './components/SetUserForm';
//--------------------- REDUX TOOLKIT ---------------------

function App() {
  return (
    <Provider store={store}> {/*5. ✅ Wrap entire app in Provider - REDUX TOOLKIT - RTK*/}
      <DataContext.Provider value={{ user: 'Alice' }}>{/* ✅ 4. Using Context API */}
        <Router>
          <header className="header">
            <h1 className="logo">React Router Demo</h1>
            <nav className="nav">
              <NavLink to="/user/43" className="nav-link">User 43</NavLink>{/* ✅ 1. Using Route Parameters (:param) */}
              <NavLink to="/search?term=reactjs" className="nav-link">Search</NavLink>{/* ✅ 2. Using Search Params / Query Strings */}
              <NavLink
                to="/details"
                state={{ id: 101, name: 'React' }}
                className="nav-link"
              >{/* ✅ 3. Using State in Link or navigate */}
                Details
              </NavLink>
              <NavLink to="/about" className="nav-link">About</NavLink>
              <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
              <NavLink to="/home" className="nav-link">Home</NavLink>
              <NavLink to="/redux" className="nav-link">Redux</NavLink>
            </nav>
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/details" element={<DetailsPage />} />
              <Route path="/about" element={<About info="This is about us!" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/redux" element={
                <>
                  <ReduxProfile />
                  <SetUserForm />
                </>
              } />
            </Routes>
          </main>
        </Router>
      </DataContext.Provider>
    </Provider>
  );
  {/* ✅ Wrap entire app in Provider for Redux */ }
}

export default App;
