import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const ScrollWithEffect = () => {
    const ref = useRef();
    useEffect(() => {
        ref.current.scrollIntoView();
        console.log("Scrolled with useEffect");
    }, []);
    return (
        <div ref={ref} style={{ backgroundColor: "lightblue", padding: "20px" }}>
            useEffect Scroll
        </div>
    );
};

const ScrollWithLayoutEffect = () => {
    const ref = useRef();
    useLayoutEffect(() => {
        ref.current.scrollIntoView();
        console.log("Scrolled with useLayoutEffect");
    }, []);
    return (
        <div ref={ref} style={{ backgroundColor: "lightgreen", padding: "20px" }}>
            useLayoutEffect Scroll
        </div>
    );
};

export default function LayoutExample() {
    const [useLayout, setUseLayout] = useState(false);

    return (
        <div style={{ height: "2000px", paddingTop: "1800px" }}>
            <button onClick={() => setUseLayout((prev) => !prev)}>
                Toggle Effect ({useLayout ? "Layout" : "Normal"})
            </button>

            {useLayout ? <ScrollWithLayoutEffect /> : <ScrollWithEffect />}
        </div>
    );
}
