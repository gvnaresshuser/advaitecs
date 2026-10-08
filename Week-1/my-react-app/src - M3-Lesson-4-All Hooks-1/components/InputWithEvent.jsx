import React, { useState } from 'react';

const InputWithEvent = () => {
    const [text, setText] = useState('');
    const [submittedText, setSubmittedText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value); // controlled value
    };

    const handleSubmit = () => {
        setSubmittedText(text);
    };

    return (
        <div style={{ margin: '20px' }}>
            <h3>🎯 Using e.target.value</h3>
            <input
                value={text}
                onChange={handleChange}
                placeholder="Type something"
                style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
            />
            <button onClick={handleSubmit}>Submit</button>
            <p><strong>Input Text:</strong> {text}</p>
            <p><strong>Submitted Text:</strong> {submittedText}</p>
        </div>
    );
};

export default InputWithEvent;
