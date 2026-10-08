import React from 'react';

function InputComponent({ onNameChange }) {
    return (
        <input
            type="text"
            placeholder="Enter your name"
            className="input"
            onChange={(e) => onNameChange(e.target.value)}
        />
    );
}

export default InputComponent;
