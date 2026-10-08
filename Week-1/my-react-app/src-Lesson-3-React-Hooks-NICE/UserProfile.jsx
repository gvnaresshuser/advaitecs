import React from 'react';

function UserProfile({ name, age }) {
    //
    return (
        <div className="p-4 border rounded shadow-md bg-white">
            <h2 className="text-xl font-bold text-blue-700">User Profile</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Age:</strong> {age}</p>
        </div>
    );
}

export default UserProfile;
