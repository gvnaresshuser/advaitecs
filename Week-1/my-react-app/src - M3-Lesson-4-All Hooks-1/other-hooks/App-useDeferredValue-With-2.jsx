import { useState, useDeferredValue } from "react";
import "./App.css";
function App() {
  const [query, setQuery] = useState("");

  // Create 10,000 items
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

  // Create a deferred version of query
  const deferredQuery = useDeferredValue(query);

  // Filter using deferredQuery
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search items..."
      />
      {query !== deferredQuery && <p>Loading...</p>}
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
