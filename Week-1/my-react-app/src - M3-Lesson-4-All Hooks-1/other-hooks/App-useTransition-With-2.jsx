import { useState, useTransition } from "react";
import "./App.css";
function App() {
  const [query, setQuery] = useState("");

  //const [filteredItems, setFilteredItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  // Create 10,000 items
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  const [filteredItems, setFilteredItems] = useState(items);

  function handleFilter(e) {
    const value = e.target.value;

    // Update input
    setQuery(value);

    startTransition(() => {
      // Filter 10,000 items
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );
      // Update results
      setFilteredItems(filtered);
    });
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleFilter}
        placeholder="Search items..."
      />
      {isPending && <p>Updating results...</p>}

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
