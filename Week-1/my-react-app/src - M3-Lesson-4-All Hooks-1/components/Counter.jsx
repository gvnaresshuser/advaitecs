import React, { useReducer } from 'react';

const initialState = { count: 0 };
function reducer(state, action) {
    switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        case 'decrement': return { count: state.count - 1 };
        default: return state;
    }
}

export const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <h3>Count: {state.count}</h3>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </>
    );
};
