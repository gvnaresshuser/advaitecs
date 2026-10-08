// CounterReducerContext.js
import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = { count: 0 };//STATE

// Reducer function
const counterReducer = (state, action) => {//REDUCER - action.payload - product.id
    switch (action.type) {
        case 'increment':
            //return { count: state.count + 1 };
            // Supports both normal increment and payload-based increment
            return { count: state.count + (action.payload || 1) };
        case 'decrement':
            //return { count: state.count - 1 };
            // Supports both normal decrement and payload-based decrement
            return { count: state.count - (action.payload || 1) };
        case 'reset':
            return initialState;
        default:
            return state;
    }
};

// Create Context
export const CounterContext = createContext();//CONTEXT

// Provider Component
export const CounterProvider = ({ children }) => {//PROVIDER
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {children}
        </CounterContext.Provider>
    );
};
/*
FOLLOW THIS ORDER FOR SIMILAR FILES
STATE
REDUCER - functions for action types - action.payload - count
CONTEXT
PROVIDER
*/