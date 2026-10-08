// Layout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
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
                <Outlet /> {/* 👈 This is where child routes will render */}
            </main>

            <footer className="footer">
                <p>© {new Date().getFullYear()} ReactSite. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Layout;
