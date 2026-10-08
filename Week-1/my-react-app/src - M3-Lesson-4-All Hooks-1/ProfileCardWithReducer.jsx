import React, { useContext } from 'react';
import { ThemeContextWithReducer } from './ThemeContextWithReducer';

export const ProfileCardWithReducer = () => {
    const { theme, dispatch } = useContext(ThemeContextWithReducer);

    const styles = {
        /* backgroundColor: theme === 'dark' ? '#333' : '#eee', */
        backgroundColor: theme === 'dark' ? 'red' : 'lime',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
    };

    return (
        <div style={styles}>
            <h2>Profile Card</h2>
            <p>Current theme: {theme}</p>
            <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
                Toggle Theme
            </button>
        </div>
    );
};
