//ParentWithSearch.jsx (Parent Component)
import React, { useState, useCallback } from "react";
import { SearchBox } from "./SearchBox";

const ParentWithSearch = () => {
    const [count, setCount] = useState(0);
    const [query, setQuery] = useState("");

    console.log("👨‍👩‍👦 ParentWithSearch rendered");

    // Without useCallback → new function created every render
    // const handleSearch = (text) => setQuery(text);

    // With useCallback → function reference stays stable
    const handleSearch = useCallback((text) => {
        setQuery(text);
    }, []);

    return (
        <div style={{ border: "2px solid teal", padding: "20px", margin: "20px" }}>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>

            <hr />

            <h3>Search Query: {query}</h3>
            <SearchBox onSearch={handleSearch} />
        </div>
    );
};

export default ParentWithSearch;
