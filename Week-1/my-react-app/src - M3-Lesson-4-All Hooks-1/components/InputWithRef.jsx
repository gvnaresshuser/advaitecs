import React, { useRef, useState } from 'react';

const InputWithRef = () => {
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const [text, setText] = useState('');

    const handleRead = () => {
        console.log(inputRef1.current.value);
        setText(inputRef1.current.value); // read input value from ref
        //inputRef1.current.focus(); // focus the input field
    };
    const handleInput = () => {
        console.log(inputRef2.current.value);
        setText(inputRef2.current.value); // update state on each keystroke
    };

    return (
        <div style={{ margin: '20px' }}>
            <h3>🔁 Using useRef</h3>
            <input
                ref={inputRef1}               
                placeholder="Type something"
                style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
            />
            <input
                ref={inputRef2}
                onChange={handleInput} // trigger on every input change
                placeholder="Type something"
                style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
            />
            <button onClick={handleRead}>Read Text</button>
            <p><strong>Text:</strong> {text}</p>
        </div>
    );
};

export default InputWithRef;
