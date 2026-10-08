import React, { useState } from "react";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

//ASSIGNMENT - Create a search box that uses the useDebounce hook to delay the search input processing by 1 second.

function App() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 1000); // 1 second delay

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Search Box with Debounce</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "250px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <p>
        <strong>Immediate Value:</strong> {text}
      </p>
      <p>
        <strong>Debounced Value:</strong> {debouncedText}
      </p>
    </div>
  );
}

export default App;
/*
Where is this useful in real applications?

The most common example is search boxes.

Instead of:

User types "javascript"

j       → API
ja      → API
jav     → API
java    → API
javas   → API
javasc  → API
javascr → API
javascri → API
javascrip → API
javascript → API

you do:

User types "javascript"
        ↓
wait until user stops
        ↓
1 second
        ↓
API request
        ↓
Search "javascript"

This is especially useful for:

🔎 Search/autocomplete
🌐 API calls
📍 Location/address search
🛒 Product search
📊 Filtering large datasets
💡 Suggestions while typing
*/
