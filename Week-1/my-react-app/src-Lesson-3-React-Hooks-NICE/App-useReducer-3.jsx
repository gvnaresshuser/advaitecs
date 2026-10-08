
import React, { useState, useEffect, useReducer } from 'react';
import './App.css';

//WITH USEREDUCER HOOK - WITH MORE ACTION TYPES AND PAYLOAD

function App() {
  //const [count, setCount] = useState(0);
  //useReducer takes two arguments - reducer function and default state
  //useReducer(ReducerType,{count:0})

  //INITIAL STATE
  const initialState = { count: 0 };

  //REDUCER FUNCTION
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increase': {
        return { count: state.count + 1 };
      }
      case 'decrease': {
        return { count: state.count - 1 };
      }
      case 'input': {
        return { count: action.payload };
      }
      default: {
        return state;
      }
    }

  };

  //useReducer DECLARATION - IT RETURNS AN ARRAY IN WHICH WE GET STATE AND DISPATCH FUNCTION
  //DISPATCH FUNCTION IS USED TO UPDATE THE STATE
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useReducer Hook
          </h1>
        </div>
        <h1>{state.count}</h1>
        <button onClick={() => dispatch({ type: 'increase' })}>Increase Count</button>
        <button onClick={() => dispatch({ type: 'decrease' })}>Decrease Count</button>
        <br />
        <input
        value={state.count}
          type="number"
          onChange={(e) => dispatch({ type: 'input', payload: Number(e.target.value) })} />
      </section>
    </>
  );
}

export default App;
