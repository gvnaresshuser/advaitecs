// ParentMemoComponent.jsx
import React, { useState } from "react";
import { ChildMemoComponent } from "./ChildMemoComponent";

export const ParentMemoComponent = () => {
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState("Welcome Student");

    console.log("👨 ParentComponent rendered");

    return (
        <div style={{ padding: "20px", border: "2px solid orange" }}>
            <h2>Parent Counter: {count}</h2>
            <button onClick={() => setCount((prev) => prev + 1)}>Increment Count</button>

            <hr />

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Change title"
            />

            {/* Child receives fixed and dynamic props */}
            <ChildMemoComponent name="Naresh" title={title} />
        </div>
    );
};
