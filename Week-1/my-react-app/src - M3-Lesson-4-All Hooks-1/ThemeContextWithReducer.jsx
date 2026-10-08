import React, { createContext, useReducer } from 'react';

const initialState = {//STATE
    theme: 'light',
};

function themeReducer(state, action) {//REDUCER
    switch (action.type) {
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            };
        default:
            return state;
    }
}

export const ThemeContextWithReducer = createContext();//CONTEXT

export const ThemeProvider = ({ children }) => {//PROVIDER
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return (
        <ThemeContextWithReducer.Provider value={{ theme: state.theme, dispatch }}>
            {children}
        </ThemeContextWithReducer.Provider>
    );
};
/*
FOLLOW THIS ORDER FOR SIMILAR FILES
STATE
REDUCER
CONTEXT
PROVIDER
*/