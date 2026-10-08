import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

export const FlickerDemo = ({ useLayout }) => {
    const divRef = useRef();
    const [mounted, setMounted] = useState(false);

    // Optional: Wait until DOM paints to simulate real mount timing
    useEffect(() => {
        setMounted(true);
    }, []);

    // Flicker fix based on the hook 
     const colorEffect = () => {
         if (divRef.current) {
             divRef.current.style.backgroundColor = 'lightgreen';
         }
     };
/*     const colorEffect = () => {
        if (divRef.current) {
            // Delay applying the green color
            setTimeout(() => {
                divRef.current.style.backgroundColor = 'lightgreen';
            }, 1000); // 300ms delay
        }
    }; */

    useLayout ? useLayoutEffect(colorEffect, []) : useEffect(colorEffect, []);

    return (
        <div
            ref={divRef}
            style={{
                width: '300px',
                height: '150px',
                backgroundColor: 'red', // 👈 Initial wrong color   
                color: 'white',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '50px auto',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                transition: 'background-color 0.3s ease',
            }}
        >
            {useLayout ? 'No Flicker (useLayoutEffect)' : 'Flicker (useEffect)'}
        </div>
    );
};
/*
We start with a red background by default.
useLayoutEffect or useEffect changes it to green.
When using useEffect, you’ll see a brief red flicker.
When using useLayoutEffect, the flicker is prevented.

| Hook Used         | What Happens                                                          |
| ----------------- | --------------------------------------------------------------------- |
| `useEffect`       | Red shows **briefly** before switching to green — **flicker appears** |
| `useLayoutEffect` | Green is applied **before paint** — user **never sees** the red       |

*/