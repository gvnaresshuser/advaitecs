// CustomInput.js
import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus(),
        clear: () => (inputRef.current.value = ''),
        blur: () => inputRef.current.blur(),
        setValue: (val) => (inputRef.current.value = val),
        getValue: () => inputRef.current.value,
        highlight: () => {
            inputRef.current.style.backgroundColor = 'yellow';
            setTimeout(() => {
                inputRef.current.style.backgroundColor = '';
            }, 1000);
        },
        toggleVisibility: () => {
            inputRef.current.style.display =
                inputRef.current.style.display === 'none' ? 'inline' : 'none';
        },
        shake: () => {
            inputRef.current.style.transition = 'transform 0.1s';
            inputRef.current.style.transform = 'translateX(5px)';
            setTimeout(() => {
                inputRef.current.style.transform = 'translateX(-5px)';
            }, 100);
            setTimeout(() => {
                inputRef.current.style.transform = 'translateX(0)';
            }, 200);
        },
        log: () => console.log(inputRef.current.value)
    }));

    return <input ref={inputRef} placeholder="Enter text" />;
});

export default CustomInput;
