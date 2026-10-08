// DashboardCard.jsx
import React, { useContext } from 'react';
import { ThemeContext, UserContext } from './ThemeContext';

export const DashboardCard = () => {
    const { theme } = useContext(ThemeContext);
    const user = useContext(UserContext);

    const dashboardStyle = {
        backgroundColor: theme === 'dark' ? '#222' : '#f9f9f9',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        margin: '1rem auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        textAlign: 'center',
    };

    return (
        <div style={dashboardStyle}>
            <h2>Dashboard</h2>
            <p>Welcome back, <strong>{user.name}</strong>!</p>
            <p>Your role is: <strong>{user.role}</strong></p>
            <p>Current Theme: <strong>{theme}</strong></p>
        </div>
    );
};
