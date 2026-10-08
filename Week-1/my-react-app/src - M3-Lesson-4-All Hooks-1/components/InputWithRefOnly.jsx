import React, { useRef } from 'react';

const InputWithRefOnly = () => {
    const inputRef = useRef();
    const displayRef = useRef();

    const handleRead = () => {
        displayRef.current.textContent = `Text: ${inputRef.current.value}`;
    };

    return (
        <div style={{ margin: '20px', fontFamily: 'sans-serif' }}>
            <h3>🔁 Read Input using <code>useRef</code> Only</h3>
            <input
                ref={inputRef}
                placeholder="Type something"
                style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
            />
            <button onClick={handleRead} style={{ padding: '8px' }}>
                Read Text
            </button>
            <p ref={displayRef} style={{ marginTop: '10px', fontWeight: 'bold' }}></p>
            
        </div>
    );
};

export default InputWithRefOnly;
