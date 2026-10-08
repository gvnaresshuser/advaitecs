import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import Home from './Home';
import About from './About';
import Contact from './Contact';
import NotFound from './NotFound';
//npm install react-router-dom
function App() {
  return (
    <Router>
      <div className="app">
        <header className="navbar">
          <div className="navbar-logo">🚀 ReactSite</div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/" className="nav-item">Home</Link></li>
              <li><Link to="/about" className="nav-item">About</Link></li>
              <li><Link to="/contact" className="nav-item">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
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
/*
BASIC STRUCTURE:
---------------
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>  
*/
