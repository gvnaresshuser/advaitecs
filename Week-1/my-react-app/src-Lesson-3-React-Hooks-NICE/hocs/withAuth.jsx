import React from "react";

const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const isAuthenticated = localStorage.getItem("token");

    console.log("isAuthenticated:", isAuthenticated);

    if (!isAuthenticated) {
      return (
        <div>
          <h2>Access Denied</h2>
          <p>Please login to access this page.</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
