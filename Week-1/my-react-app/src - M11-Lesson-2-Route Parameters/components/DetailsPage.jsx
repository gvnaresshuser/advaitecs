
// src/components/DetailsPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

function DetailsPage() {
    const location = useLocation();
    const { id, name } = location.state || {};
    return <h2>Details: {name} (ID: {id})</h2>;
}

export default DetailsPage;