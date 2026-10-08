import React from 'react';
import useHttp from '../hooks/useHttp';

function DeleteUser() {
    const { sendRequest, data, loading, error } = useHttp();

    const deleteUser = () => {
        sendRequest({
            url: 'https://jsonplaceholder.typicode.com/users/1',
            method: 'DELETE',
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Delete User (ID 1)</h2>
            <button onClick={deleteUser} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete User'}
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

export default DeleteUser;
