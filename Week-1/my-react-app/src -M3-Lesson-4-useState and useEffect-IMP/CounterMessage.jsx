import React, { useState } from 'react';
import './CounterMessage.css';

const CounterMessage = () => {
    let msg = '';//local variable
    msg = 'hello';
    const [count, setCount] = useState(10);
    const [message, setMessage] = useState('naresh');//state variable
    const [inputValue, setInputValue] = useState('');

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => {
        if (count > 0) setCount((prev) => prev - 1);
    };
    const reset = () => setCount(0);

    const updateMessage = () => {
        setMessage(inputValue);
        setInputValue('');
    };

    return (
        <div className="counter-container">
            <h2>React useState Assignment</h2>
            <p className="count-display">Count: {count}</p>
            <div className="button-group">
                <button onClick={increment}>+</button>
                <button onClick={decrement}                 
                disabled={count === 0}
                    style={count === 0 ? { background: 'red' } : {}}
                >-</button>
                <button onClick={reset}>Reset</button>
            </div>

            <div className="message-section">
                <p className="message-display">Message: {message}</p>
                <input
                    type="text"
                    placeholder="Enter your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={updateMessage}>Set Message</button>
            </div>
        </div>
    );
};

export default CounterMessage;
//style={count === 0 ? { background: 'red' } : {}}