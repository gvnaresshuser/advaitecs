import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Products() {
    const linkStyle = {
        marginRight: 10,
        padding: '8px 15px',
        textDecoration: 'none',
        border: '1px solid #ccc',
        borderRadius: 5
    };
    const activeStyle = { background: '#28a745', color: '#fff', borderColor: '#28a745' };

    return (
        <div style={{ padding: 20 }}>
            <h2>Our Products</h2>
            <NavLink to="webapp" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>Web Apps</NavLink>
            <NavLink to="mobileapp" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>Mobile Apps</NavLink>
            <Outlet />
        </div>
    );
}
