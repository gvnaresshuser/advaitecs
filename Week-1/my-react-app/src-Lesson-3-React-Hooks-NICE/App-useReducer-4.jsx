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
    // INCREASE COUNT
    case "INCREASE":
      return {
        ...state,
        count: state.count + 1,
      };

    // DECREASE COUNT
    case "DECREASE":
      return {
        ...state,
        count: state.count - 1,
      };

    // SET COUNT FROM INPUT
    case "SET_COUNT":
      return {
        ...state,
        count: action.payload,
      };

    // CHANGE NAME
    case "CHANGE_NAME":
      return {
        ...state,
        name: action.payload,
      };

    // INCREASE AGE
    case "INCREASE_AGE":
      return {
        ...state,
        age: state.age + 1,
      };

    // LOGIN
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };

    // LOGOUT
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      };

    // DEFAULT
    default:
      return state;
  }
};

function App() {
  // useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section id="center">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
          useReducer Hook
        </h1>
      </div>

      <hr />

      {/* ================= COUNT ================= */}

      <h2>Count: {state.count}</h2>

      {/* INPUT */}

      <input
        type="number"
        value={state.count}
        onChange={(e) =>
          dispatch({
            type: "SET_COUNT",
            //payload: Number(e.target.value),
            payload: e.target.value === "" ? 0 : Number(e.target.value),
          })
        }
      />

      {/* INCREASE */}

      <button onClick={() => dispatch({ type: "INCREASE" })}>
        Increase Count
      </button>

      {/* DECREASE */}

      <button onClick={() => dispatch({ type: "DECREASE" })}>
        Decrease Count
      </button>

      <hr />
      {/* NAME */}

      <input
        type="text"
        value={state.name}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_NAME",
            payload: e.target.value,
          })
        }
      />

      {/* ================= NAME ================= */}

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

      {/* ================= AGE ================= */}

      <h2>Age: {state.age}</h2>

      <button onClick={() => dispatch({ type: "INCREASE_AGE" })}>
        Increase Age
      </button>

      <hr />

      {/* ================= LOGIN ================= */}

      <h2>Status: {state.isLoggedIn ? "Logged In" : "Logged Out"}</h2>

      <button onClick={() => dispatch({ type: "LOGIN" })}>Login</button>

      <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
    </section>
  );
}

export default App;
