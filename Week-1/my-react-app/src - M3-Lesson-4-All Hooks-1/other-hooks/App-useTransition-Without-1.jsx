import { useState } from "react";
import "./App.css";
function App() {
  const [query, setQuery] = useState("");

  const [filteredItems, setFilteredItems] = useState([]);

  // Create 10,000 items
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

  function handleFilter(e) {
    const value = e.target.value;

    // Update input
    setQuery(value);

    // Filter 10,000 items
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );

    // Update results
    setFilteredItems(filtered);
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleFilter}
        placeholder="Search items..."
      />

      <p>Results: {filteredItems.length}</p>

      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
