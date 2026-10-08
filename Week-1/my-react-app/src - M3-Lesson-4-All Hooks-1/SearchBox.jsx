//SearchBox.jsx (Child Component)
import React from "react";

// React.memo prevents re-render unless props change
export const SearchBox = React.memo(({ onSearch }) => {
    console.log("🔎 SearchBox rendered");

    return (
        <div style={{ marginTop: "20px" }}>
            <input
                type="text"
                placeholder="Type to search..."
                onChange={(e) => onSearch(e.target.value)}
                style={{ padding: "8px", border: "1px solid gray", borderRadius: "5px" }}
            />
        </div>
    );
});
