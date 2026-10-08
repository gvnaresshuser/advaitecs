import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);
  const [retryCount, setRetryCount] = useState(0); // 🔹 Track retries

  const fetchData = async () => {
    try {
      setErrorMessage(null); // Clear any old error
      setData(null); // Optional: clear old data while retrying
      //const res = await fetch('https://api.invalidurl.com');
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setErrorMessage(error.message);
    }
  };

  // Fetch when component mounts OR retryCount changes
  useEffect(() => {
    fetchData();
  }, [retryCount]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Fetching Data...</h1>
      {errorMessage ? (
        <div>
          <p style={{ color: 'red' }}>Error: {errorMessage}</p>
          <button onClick={() => setRetryCount(prev => prev + 1)}>
            🔄 Retry
          </button>
        </div>
      ) : data ? (
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> – {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>Data is being fetched. Please wait...</p>
      )}
    </div>
  );
}

export default App;
