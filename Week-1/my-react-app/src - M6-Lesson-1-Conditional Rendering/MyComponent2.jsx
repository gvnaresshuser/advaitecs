import { UserDashboard, LoginButton } from './UserComponents';
import React from 'react';

function MyComponent2({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? <UserDashboard /> : <LoginButton />}
        </div>
    );
}
export { MyComponent2 };
/*
Using the Ternary Operator:

The ternary operator (condition ? expression1 : expression2) is often used for 
concise conditional rendering:


*/