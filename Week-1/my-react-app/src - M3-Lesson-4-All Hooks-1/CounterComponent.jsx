// CounterComponent.js
import React, { useContext } from 'react';
import { CounterContext } from './CounterReducerContext';

export const CounterComponent = () => {
    const { state, dispatch } = useContext(CounterContext);

    const handleIncrementByFive = () => {
        dispatch({ type: 'increment', payload: 5 }); // Increase by 5
    };

    const handleDecrementByTwo = () => {
        dispatch({ type: 'decrement', payload: 5 }); // Decrease by 2
    };

    return (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
            <h2>Counter: {state.count}</h2>
            <button onClick={() => dispatch({ type: 'increment' })}>➕</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>➖</button>
            <button onClick={() => dispatch({ type: 'reset' })}>🔄 Reset</button>
            <button onClick={handleIncrementByFive}>➕ +5</button>
            <button onClick={handleDecrementByTwo}>➖ -5</button>
        </div>
    );
};
