// src/components/Dashboard.jsx
import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

function Dashboard() {
    const { user } = useContext(DataContext);
    return <h2>Welcome {user}</h2>;
}

export default Dashboard;