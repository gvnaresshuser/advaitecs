import React, { useContext } from 'react';
import { ThemeContext, UserContext } from './ThemeContext';

export const ProfileCard = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const user = useContext(UserContext);

    const cardStyle = {
        backgroundColor: theme === 'dark' ? '#333' : '#eee',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '20px',
        border:'1px solid navy',
        borderRadius: '10px',
        width: '300px',
        margin: '1rem auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        textAlign: 'center',
    };

    const buttonStyle = {
        marginTop: '15px',
        padding: '8px 16px',
        backgroundColor: theme === 'dark' ? '#444' : '#ddd',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        color: theme === 'dark' ? '#fff' : '#000',
    };

    return (
        <div style={cardStyle}>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Theme:</strong> {theme}</p>
            <button style={buttonStyle} onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
};

//export const ProfileCard = ({ nameAttr }) => {

{/*  
    <p><strong>Name Attr:</strong> {nameAttr}</p>
    <p><strong>Profession:</strong> {user.profession}</p> 
*/}