import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
    <nav className="navbar-container">
        <h2 className="navbar-heading">🚀 Router Redirects Example</h2>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/logout">Logout</Link></li>
            <li><Link to="/old-about">Old-About</Link></li>
        </ul>
    </nav>
);

export default Navbar;
