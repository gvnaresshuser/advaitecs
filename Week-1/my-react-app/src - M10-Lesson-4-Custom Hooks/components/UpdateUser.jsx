import React, { useState } from 'react';
import useHttp from '../hooks/useHttp';

function UpdateUser() {
    const { sendRequest, data, loading, error } = useHttp();
    const [newName, setNewName] = useState('');

    const updateUser = () => {
        sendRequest({
            url: 'https://jsonplaceholder.typicode.com/users/1',
            method: 'PUT',
            body: { name: newName, email: 'updated@email.com' }
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Update User (ID 1)</h2>
            <input
                type="text"
                placeholder="New Name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
            />
            <button onClick={updateUser} disabled={loading}>
                {loading ? 'Updating...' : 'Update User'}
            </button>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {data && (
                <pre style={{ background: '#f0f0f0', padding: '10px' }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default UpdateUser;
