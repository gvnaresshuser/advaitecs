import React from 'react';
import { useSelector } from 'react-redux';
import './ReduxProfile.css'; // 👈 Import CSS file

const ReduxProfile = () => {
    const user = useSelector((state) => state.user);//TO READ DATA FROM REDUX STORE

    return (
        <div className="profile-container">
            <h2 className="profile-title">Redux Profile</h2>
            <div className="profile-card">
                <p><strong>Name:</strong> <span>{user.name}</span></p>
                <p><strong>Email:</strong> <span>{user.email}</span></p>
            </div>
        </div>
    );
};

export default ReduxProfile;
