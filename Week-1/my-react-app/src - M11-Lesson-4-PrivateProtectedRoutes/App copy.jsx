import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
//---------------------- PROTECTED ROUTES -----------------------------------
import { Privateroute, Privaterouteadmin } from "./Privateroute.jsx";
import Login from "./Login.jsx";
import AdminLogin from "./AdminLogin.jsx";
import Dashboard from "./Dashboard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import Navbar from "./Navbar.jsx";
//---------------------- PROTECTED ROUTES -----------------------------------
import Home from './Home.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
//import Crud from "./crud.jsx";
import AllRoutes from './AllRoutes';
import Page1 from "./Page1";
import Page2 from "./Page2";


function App() {

  return (
    <>
      {/* IN THE SAME COMPONENT */}
      {/* Navigation Links - npm install react-router-dom  <Outlet />*/}
      <Router>
        <div>
          <nav>
            <ul>             
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/">Page1</Link></li>
              <li><Link to="/page2">Page2</Link></li>
            </ul>
          </nav>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />    
            <Route path="/" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />       
          </Routes>
        </div>
      </Router>

      {/* <li><Link to="/crud">CRUD</Link></li> */}
      {/* <Route path="/page2" element={<Page2 />} /> */}
      {/* <Route path="/crud" element={<Crud />} /> */}

      {/* AS A SEPARATE COMPONENT */}
      {/* <AllRoutes /> */}

      {/* COMPONENTS ARE DISPLAYED INSIDE THE LAYOUT, IF PATH IS MATHCED    
            FOR CHILD COMPONENTS THEY ARE RENDERED INSIDE <Outlet />
            SEE LAST EXAMPLE - Privateroute.js
      <div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
          <h2>About Page</h2>
        </div>
 */}
      {/*---------------------- PROTECTED ROUTES ------------------------- */}
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" }}>
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Routes for Users */}
            <Route element={<Privateroute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Protected Routes for Admins */}
            <Route element={<Privaterouteadmin />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
      {/*---------------------- PROTECTED ROUTES ------------------------- */}
    </>
  );
}

export default App;
