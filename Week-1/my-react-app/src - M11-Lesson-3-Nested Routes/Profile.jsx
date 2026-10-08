// Profile.js
import React, { useContext } from 'react';
import { ProfileContext } from './Dashboard';

const Profile = () => {
    // Consume profileData from context
    const profile = useContext(ProfileContext);

    return (
        <div style={{
            background: "lightcyan",
            padding: "20px",
            borderRadius: "5px",
            border: "1px solid #f9bfb2",
            width:'300px'
        }}>
            <h3>Profile Page</h3>
            <hr></hr>
            {/* Display profile data */}
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
    );
};

export default Profile;
