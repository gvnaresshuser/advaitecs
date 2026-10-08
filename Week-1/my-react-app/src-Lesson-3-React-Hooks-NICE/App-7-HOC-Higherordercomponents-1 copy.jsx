import React from "react";
import "./App.css";
import "./Hoc1.css";
// --------------------------------------------------
// 1. HOC: withLoading
// Adds loading behavior to any component
// --------------------------------------------------
function withLoading(Component) {
  return function EnhancedComponent({ loading, ...props }) {
    if (loading) {
      return <h2>Loading...</h2>;
    }

    return <Component {...props} />;
  };
}
//This is the React component that I'm receiving and enhancing.

// --------------------------------------------------
// 2. HOC: withAuth
// Allows content only when the user is logged in
// --------------------------------------------------
function withAuth(Component) {
  return function AuthenticatedComponent({ isLoggedIn, ...props }) {
    if (!isLoggedIn) {
      return <h2>Please login first</h2>;
    }

    return <Component {...props} />;
  };
}

// --------------------------------------------------
// 3. HOC: withLogger
// Logs whenever the enhanced component renders
// --------------------------------------------------
function withLogger(Component) {
  return function LoggedComponent(props) {
    console.log("Component rendered:", Component.name);

    return <Component {...props} />;
  };
}

// --------------------------------------------------
// Normal components
// --------------------------------------------------
function User({ name }) {
  return <h3>👤 User: {name}</h3>;
}

function Products() {
  return <h3>🛍️ Product Data Loaded</h3>;
}

function Dashboard() {
  return <h3>📊 Welcome to Dashboard</h3>;
}

// --------------------------------------------------
// Create enhanced components
// --------------------------------------------------
const UserWithLoading = withLoading(User);
const ProductsWithLoading = withLoading(Products);
const ProtectedDashboard = withAuth(Dashboard);
const UserWithLogger = withLogger(User);

// --------------------------------------------------
// App
// --------------------------------------------------
function App() {
  return (
    <div className="app">
      <h1>Higher-Order Components (HOC)</h1>

      <section>
        <h2>1. withLoading HOC</h2>

        <UserWithLoading loading={false} name="Naressh" />

        <ProductsWithLoading loading={true} />
      </section>

      <section>
        <h2>2. withAuth HOC</h2>

        <ProtectedDashboard isLoggedIn={true} />
      </section>

      <section>
        <h2>3. withLogger HOC</h2>

        <UserWithLogger name="Naressh" />

        <p className="note">Open the browser console to see the logger.</p>
      </section>

      <section>
        <h2>HOC Pattern</h2>

        <pre>
          {`function withSomething(Component) {
  return function EnhancedComponent(props) {
    // Extra behavior

    return <Component {...props} />;
  };
}

const Enhanced = withSomething(MyComponent);`}
        </pre>
      </section>
    </div>
  );
}

export default App;
