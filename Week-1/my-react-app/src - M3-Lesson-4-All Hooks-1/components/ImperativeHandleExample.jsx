import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
    const innerRef = useRef();
    useImperativeHandle(ref, () => ({ focus: () => innerRef.current.focus() }));
    return <input ref={innerRef} /> ;
});

export const ImperativeHandleExample = () => {
    const ref = useRef();
    return (
        <>
            <CustomInput ref={ref} />
            <button onClick={() => ref.current.focus()}>Focus from Parent</button>
        </>
    );
};
