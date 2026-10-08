import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (input.trim() === '') {
      setError('Input cannot be empty');
    } else {
      setError('');
      console.log('Submitted:', input);
      alert(`Submitted: ${input}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Form Validation Example</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
        style={{ padding: 8, marginRight: 10 }}
      />
      <button onClick={handleSubmit} style={{ padding: 8 }}>
        Submit
      </button>
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </div>
  );
}

export default App;
