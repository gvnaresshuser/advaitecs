import React, { useRef, useEffect, useState } from 'react';
//Example: Compare current input value with the previous one
//👉 State updates trigger re-render, but useRef keeps the old value safe across renders.

const PreviousValue = () => {
    const [text, setText] = useState('');
    const prevTextRef = useRef('');

    useEffect(() => {
        prevTextRef.current = text; // store previous value - no re-render
    }, [text]);

    //prevTextRef.current = text; // store latest value
    return (
        <div>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something..."
            />
            <p>Current: {text}</p>
            <p>Previous: {prevTextRef.current}</p>
        </div>
    );
};

export default PreviousValue;
