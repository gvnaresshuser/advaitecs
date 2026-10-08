import React, { useRef, useEffect, useState } from "react";

const PreviousValueDemo = () => {
    const [text, setText] = useState("");

    // 👉 Method 1: Track previous value using useEffect
    const prevTextRef = useRef("");
    useEffect(() => {
        prevTextRef.current = text;
    }, [text]);

    // 👉 Method 2: Direct DOM reference
    const inputRef = useRef(null);

    return (
        <div>
            <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something..."
            />

            <p>🔹 Current (state): {text}</p>
            <p>🔹 Previous (via useRef + useEffect): {prevTextRef.current}</p>
            <p>🔹 Current (direct DOM .value): {inputRef.current?.value}</p>
        </div>
    );
};

export default PreviousValueDemo;
