// src/components/UserProfile.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
    const { id } = useParams();
    return <h2>User ID: {id}</h2>;
}

export default UserProfile;