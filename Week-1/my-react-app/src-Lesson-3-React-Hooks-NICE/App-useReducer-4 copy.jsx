import React, { useReducer } from "react";
import "./App.css";

// INITIAL STATE
const initialState = {
  count: 0,
  name: "Naressh",
  age: 25,
  isLoggedIn: false,
};

// REDUCER FUNCTION
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        count: state.count + 1,
      };

    case "DECREASE":
      return {
        ...state,
        count: state.count - 1,
      };

    case "CHANGE_NAME":
      return {
        ...state,
        name: action.payload,
      };

    case "INCREASE_AGE":
      return {
        ...state,
        age: state.age + 1,
      };

    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

function App() {
  // useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section id="center">
      <h1>useReducer Hook</h1>

      <hr />

      {/* COUNT */}
      <h2>Count: {state.count}</h2>

      <button onClick={() => dispatch({ type: "INCREASE" })}>
        Increase Count
      </button>

      <button onClick={() => dispatch({ type: "DECREASE" })}>
        Decrease Count
      </button>

      <hr />

      {/* NAME */}
      <h2>Name: {state.name}</h2>

      <button
        onClick={() =>
          dispatch({
            type: "CHANGE_NAME",
            payload: "React Student",
          })
        }
      >
        Change Name
      </button>

      <hr />

      {/* AGE */}
      <h2>Age: {state.age}</h2>

      <button onClick={() => dispatch({ type: "INCREASE_AGE" })}>
        Increase Age
      </button>

      <hr />

      {/* LOGIN */}
      <h2>Status: {state.isLoggedIn ? "Logged In" : "Logged Out"}</h2>

      <button onClick={() => dispatch({ type: "LOGIN" })}>Login</button>

      <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
    </section>
  );
}

export default App;
