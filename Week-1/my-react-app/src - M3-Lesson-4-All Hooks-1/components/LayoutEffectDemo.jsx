import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function LayoutEffectDemo() {
    const divRef = useRef(null);
    const [width, setWidth] = useState(0);

    //ResizeObserver is a built-in Web API provided by modern browsers 
    //What is ResizeObserver?
    //It’s a browser API that watches for changes in the size of an element 
    //specifically its content box.Unlike window.onresize, which only watches the window, 
    //ResizeObserver can watch individual DOM elements.

    useEffect(() => {
    //useLayoutEffect(() => {
        const element = divRef.current;
        if (!element) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                console.log('Resized:', entry.contentRect.width);
                setWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div>
            <div
                ref={divRef}
                style={{
                    width: '50%',
                    padding: '20px',
                    backgroundColor: 'lightblue',
                    resize: 'horizontal',
                    overflow: 'auto',
                }}
            >
                Resize the window or drag me!
            </div>
            <p>Measured Width: {width.toFixed(2)}px</p>
        </div>
    );
}

export default LayoutEffectDemo;
