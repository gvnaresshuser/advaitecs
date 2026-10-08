import React from 'react';

// UserDashboard component
function UserDashboard() {
    return (
        <div>
            <h2>Welcome to the User Dashboard!</h2>
            {/* Add user dashboard content here */}
        </div>
    );
}

// LoginButton component
function LoginButton() {
    function handleLogin() {
        // Handle login logic here
        console.log('User logged in');
    }

    return (
        <button onClick={handleLogin}>Login</button>
    );
}

export { UserDashboard, LoginButton };
