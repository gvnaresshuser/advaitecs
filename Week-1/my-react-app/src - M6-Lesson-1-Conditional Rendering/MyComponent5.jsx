import { UserDashboard, LoginButton } from './UserComponents';
import React from 'react';
import { AdminDashboard, DefaultDashboard } from './DashboardComponent';

function MyComponent5({ userType }) {
    switch (userType) {
        case 'admin':
            return <AdminDashboard />;
        case 'user':
            return <UserDashboard />;
        default:
            return <DefaultDashboard />;
    }
}
export { MyComponent5 };
/*
Using Switch Statements:

For more complex conditions, you might use switch statements:
You can use switch statements to handle multiple conditions and render different components based on the value of a prop or state variable.
*/