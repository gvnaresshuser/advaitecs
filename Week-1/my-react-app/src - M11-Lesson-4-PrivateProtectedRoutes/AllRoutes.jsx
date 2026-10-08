import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Page1 from "./Page1";
import Page2 from "./Page2";

function AllRoutes() {

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        {/* <li><Link to="/">Home</Link></li> */}
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/">Page1</Link></li>
                    </ul>
                </nav>
                <Routes>
                   {/*  <Route path="/" element={<Home />} /> */}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/" element={<Page1 />} />
                    <Route path="/page2" element={<Page2 />} />
                </Routes>
            </div>
        </Router>
    );
}
export default AllRoutes;