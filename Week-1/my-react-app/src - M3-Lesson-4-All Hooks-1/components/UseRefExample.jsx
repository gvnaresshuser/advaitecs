import React, { useRef } from 'react';

export const UseRefExample = () => {
    const inputRef = useRef(null);
    return (
        <>
            <input ref={inputRef} type="text" />
            <button onClick={() => inputRef.current.focus()}>Focus Input</button>
        </>
    );
};
