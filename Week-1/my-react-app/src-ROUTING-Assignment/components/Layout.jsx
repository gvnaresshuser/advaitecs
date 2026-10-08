import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
    return (
        <div className="app-layout">
            <header className="navbar">
                <div className="logo">🌟 MyReactApp</div>
                <nav>
                    <NavLink to="/" end className="nav-item">Home</NavLink>
                    <NavLink to="/company" className="nav-item">Company</NavLink>
                    <NavLink to="/products" className="nav-item">Products</NavLink>
                    <NavLink to="/contact" className="nav-item">Contact</NavLink>
                    <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
                </nav>
            </header>

            <main className="content">
                <Outlet />
            </main>

            <footer className="footer">
                <p>© {new Date().getFullYear()} MyReactApp. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default Layout;
