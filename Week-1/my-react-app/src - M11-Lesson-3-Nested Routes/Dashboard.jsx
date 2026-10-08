import React, { createContext, useState } from 'react';
import { NavLink,Link, Outlet, useLocation } from 'react-router-dom';
import './Dashboard.css';

// Contexts
export const ProfileContext = createContext();
export const SettingsContext = createContext();

const Dashboard = () => {
    const location = useLocation();

    const [profileData] = useState({
        username: 'john_doe',
        email: 'john@example.com',
        bio: 'This is profile-specific bio text.'
    });

    const [settingsData] = useState({
        theme: 'dark',
        notifications: true,
        language: 'English'
    });

    // Default link style
    const linkStyle = {
        padding: '10px 15px',
        textDecoration: 'none',
        borderRadius: '5px',
        color: '#333',
        backgroundColor: '#f0f0f0',
        display: 'inline-block',
        transition: '0.3s',
    };

    // Active link style
    const activeLinkStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: 'bold',
    };

    const listStyle = {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="dashboard-content">
                <div className="sidebar">
                    <ul style={listStyle}>
                       {/*  
                       <li><Link style={{ ...linkStyle }} to="profile">Profile</Link></li>
                        <li><Link style={{ ...linkStyle }} to="settings">Settings</Link></li> 
                        */}
                        <li>
                            <NavLink
                                to="profile"
                                style={({ isActive }) => ({
                                    ...linkStyle,
                                    ...(isActive ? activeLinkStyle : {})
                                })}
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="settings"
                                style={({ isActive }) => ({
                                    ...linkStyle,
                                    ...(isActive ? activeLinkStyle : {})
                                })}
                            >
                                Settings
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="main-content">
                    <ProfileContext.Provider value={profileData}>
                        <SettingsContext.Provider value={settingsData}>
                            <Outlet />
                        </SettingsContext.Provider>
                    </ProfileContext.Provider>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
