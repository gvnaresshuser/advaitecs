// src/components/HomePage.jsx
import React from 'react';
import { useContext } from 'react';


import { DataContext } from '../context/DataContext';


function HomePage() {
     const { user } = useContext(DataContext);//user:''

    const userLS = localStorage.getItem('user') || 'Guest';
    return <h2>Hello {userLS} - {user}</h2>;
}

export default HomePage;