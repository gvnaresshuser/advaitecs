import React from 'react';
import { UserDashboard, LoginButton } from './UserComponents';

function MyComponent({ isLoggedIn }) {
    if (isLoggedIn) {
        return <UserDashboard />;
    } else {
        return <LoginButton />;
    }
}
export { MyComponent };
/*
Using Conditional Statements in JSX:
You can use regular JavaScript conditional statements such as if and else 
directly within JSX:
*/
