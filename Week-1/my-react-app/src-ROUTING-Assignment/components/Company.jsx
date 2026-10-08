import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Company() {
    const linkStyle = {
        marginRight: 10,
        padding: '8px 15px',
        textDecoration: 'none',
        border: '1px solid #ccc',
        borderRadius: 5
    };
    const activeStyle = { background: '#007bff', color: '#fff', borderColor: '#007bff' };

    return (
        <div style={{ padding: 20 }}>
            <h2>About Our Company</h2>
            <NavLink to="leadership" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>Leadership</NavLink>
            <NavLink to="vision" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>Vision</NavLink>
            <Outlet />
        </div>
    );
}
