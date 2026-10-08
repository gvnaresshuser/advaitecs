import './App.css';
import { AdminDashboard, DefaultDashboard } from './DashboardComponent';
import { LoginButton, UserDashboard } from './UserComponents';

//CALL THIS COMPONENT IN main.jsx like this
// <App userType="admin" isLoggedIn={true} />

function App({ userType, isLoggedIn }) {
  let dashboardComponent;

  console.log('userType : ' + userType);
  console.log('isLoggedIn : ' + isLoggedIn);

  if (isLoggedIn) {
    if (userType === 'admin') {
      dashboardComponent = <AdminDashboard />;
    } else {
      dashboardComponent = <UserDashboard />;
    }
  } else {
    dashboardComponent = <DefaultDashboard />;
  }

  return (
    <div className="App">
      <div>
        {dashboardComponent}
        {!isLoggedIn && <LoginButton />}
      </div>

    </div>
  );
}

export default App;
/*
<App />
function App({ userType, isLoggedIn }) {
WE ARE NOT PROVIDING userType AND isLoggedIn PROPS
So, they will be undefined.
---------------------------------------------------
If isLoggedIn is undefined:
!isLoggedIn   // becomes !undefined
              // which is true
Because undefined is falsy, negating it gives true.
---------------------------------------------------

We define a dashboardComponent variable to hold the component that should be rendered 
based on the condition.
We use nested if statements to check whether the user is logged in and their user type. 
Depending on the conditions, we assign the appropriate dashboard component to the 
dashboardComponent variable.
Finally, we render the dashboardComponent within the JSX of the App component's return 

statement. We also conditionally render the LoginButton component if the user is not 
logged in.
Using if statements for conditional rendering provides more flexibility in handling 
complex conditions, especially when multiple conditions need to be evaluated. 
However, be mindful of keeping your code readable and maintainable.

*/
