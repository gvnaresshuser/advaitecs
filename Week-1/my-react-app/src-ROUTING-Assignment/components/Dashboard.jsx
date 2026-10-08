import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Dashboard() {
    const { user } = useContext(AppContext);
    return (
        <div style={{ padding: 20 }}>
            <h2>Dashboard</h2>
            <p>Welcome back, <strong>{user}</strong>! (Using Context API)</p>
        </div>
    );
}
