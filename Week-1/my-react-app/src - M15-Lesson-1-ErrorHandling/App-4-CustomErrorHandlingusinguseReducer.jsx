import { useEffect, useReducer } from 'react';
import './App.css';

const initialState = {
  error: null,
  data: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, data: null };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.invalidurl.com');
        //const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Fetching Data with useReducer</h1>

      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}

      {state.data ? (
        <pre>{JSON.stringify(state.data, null, 2)}</pre>
      ) : !state.error ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
}

export default App;
