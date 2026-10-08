import React from 'react';
import { UserDashboard, LoginButton } from './UserComponents';

class MyComponent4 extends React.Component {
    render() {
        const { isLoggedIn } = this.props;
        if (isLoggedIn) {
            return <UserDashboard />;
        } else {
            return <LoginButton />;
        }
    }
}
export { MyComponent4 };
/*
Using Conditional Rendering outside JSX:

You can conditionally render components or elements outside JSX, 
typically within the render method of a class component:


*/