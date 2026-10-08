import React, { useRef } from 'react';
import { useState } from 'react';
const NoRerenderComponent = () => {
    const countRef = useRef(0);
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);

    const handleClick = () => {    
        countRef.current += 1;
        console.log('Clicked:', countRef.current);
        setText(countRef.current);
        //BEFORE WE WERE DOING THIS
        setCount(prevCount => prevCount + 1); // Update state to trigger re-render
    };

    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
            {/* This will NOT show updated countRef unless manually updated */}
            <p>Click count(ref): {countRef.current}</p>
            <p>Click text: {text}</p>
            <p>Click count(state): {count}</p>
        </div>
    );
};

export default NoRerenderComponent;
