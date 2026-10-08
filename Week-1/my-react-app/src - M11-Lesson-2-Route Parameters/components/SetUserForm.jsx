// components/SetUserForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';// TO DISPATCH ACTIONS
import { setUser } from '../store';
import './setUserForm.css';

const SetUserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setUser({ name, email }));// Dispatch the action to update the user in Redux store
        //setName(''); // Clear the input field after submission
    };

    return (
        <form onSubmit={handleSubmit} className="redux-form">
            <h3 className="form-title">Update Redux User</h3>

            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
            />

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
            />

            <button type="submit" className="form-button">
                Set User
            </button>
        </form>


    );
};

export default SetUserForm;
