import { UserDashboard, LoginButton } from './UserComponents';
import React from 'react';

function MyComponent3({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn && <UserDashboard />}
        </div>
    );
}
export { MyComponent3 };
/*
Using Logical && Operator:

You can use the logical AND (&&) operator to conditionally render elements. 
If the condition is true, the component after && will be rendered:


*/