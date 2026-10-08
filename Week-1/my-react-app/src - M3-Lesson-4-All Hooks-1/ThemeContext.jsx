import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();
export const UserContext = createContext();


export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark'); // default is light

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const user = { name: 'Naresh', role: 'Admin' };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        </ThemeContext.Provider>
    );
};

//store will provide these values to all components
//STORE[CONTEXT] ->PROVIDE -> VALUES

//ThemeContext.Provider value={{ theme, toggleTheme }}
//ThemeContext = STORE
//Provider
//Value = { theme, toggleTheme }

//AppProvider will provide the context to all components,
// that are wrapped inside it[children]

//createContext,useContext,


//export const AppProvider = ({ profession, children }) => {
//const user = { name: 'Naresh', role: 'Admin', profession: profession };
