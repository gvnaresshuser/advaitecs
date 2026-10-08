import React from 'react';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const { username } = useParams();
    return (
        <div style={{ padding: 20 }}>
            <h2>User Profile</h2>
            <p>Welcome, {username}! This route uses Route Parameters.</p>
        </div>
    );
}
