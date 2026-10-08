// Settings.js
import React, { useContext } from 'react';
import { SettingsContext } from './Dashboard';

const Settings = () => {
    // Consume settingsData from context
    const settings = useContext(SettingsContext);
    return (
        <div style={{
            background: "lightyellow",
            padding: "20px",
            borderRadius: "5px",
            border: "1px solid #f9bfb2",
            width: '300px'
        }}>
            <h3>Settings Page</h3>
            <hr></hr>
            {/* Display settings data */}
            <p><strong>Theme:</strong> {settings.theme}</p>
            <p><strong>Notifications:</strong> {settings.notifications ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Language:</strong> {settings.language}</p>
        </div>
    );
};

export default Settings;
