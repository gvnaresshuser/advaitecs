import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Details() {
    const { state } = useLocation();
    const { id, title } = state || {};

    return (
        <div style={{ padding: 20 }}>
            <h2>Details Page</h2>
            {id ? (
                <p>Viewing details for <strong>{title}</strong> (ID: {id})</p>
            ) : (
                <p>No details available. Navigate from Home page.</p>
            )}
        </div>
    );
}
