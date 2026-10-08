import React, { useState } from 'react';
import useHttp from '../hooks/useHttp';

function UserManager() {
    const { sendRequest, data, error, loading } = useHttp();
    const [userName, setUserName] = useState('');

    const addUser = () => {
        sendRequest({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'POST',
            body: { name: userName },
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>User Manager</h2>
            <input
                type="text"
                placeholder="Enter user name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={addUser} disabled={loading}>
                {loading ? 'Sending...' : 'Add User'}
            </button>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {data && (
                <pre style={{ marginTop: '20px', background: '#f0f0f0', padding: '10px' }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default UserManager;
