import React, { useRef, useLayoutEffect } from 'react';

export const LayoutEffectExample = () => {
    const divRef = useRef();
    useLayoutEffect(() => {
        divRef.current.style.backgroundColor = 'lightgreen';
    }, []);
    return <div ref={divRef}>useLayoutEffect Example</div>;
};
