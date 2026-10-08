// App.jsx
import React from 'react';
import './App.css';

// Reusable component
const Header = ({ title }) => {
  return <h1 className="main-heading">{title}</h1>;
};

function App() {
  const name = 'John';
  const imageUrl = 'https://png.pngtree.com/png-clipart/20201016/ourmid/pngtree-rustic-flower-graphic-png-image_2368863.jpg';

  const isLoggedIn = true;

  const headingStyle = {
    color: 'blue',
    backgroundColor: 'yellow',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
  };

  const fruits = ['Apple', 'Banana', 'Cherry'];

  const dangerousText = "<script>alert('Hacked!')</script>";
  const dangerousTextEscaped = `<img src="/logo.jpg" onerror="alert('Hacked by img!')" />`;
  const dangerousText1 = `<img src="/logo.jpg" onerror="alert('Hacked by img!')" />`;

  return (
    <div className="App">
      {/* Using custom component */}
      <Header title="Welcome to My App" />

      {/* Expressions and image attribute */}
      <div>
        <h2>Hello, {name} 👋</h2>
        <img src={imageUrl} alt="Rustic Flower" width="200" />
      </div>

      {/* Conditional Rendering */}
      <div>
        {isLoggedIn ? (
          <p style={{ color: 'green' }}>You are logged in.</p>
        ) : (
          <p style={{ color: 'red' }}>Please log in.</p>
        )}
      </div>

      {/* Inline styling */}
      <h3 style={headingStyle}>This heading uses inline styles</h3>

      {/* JSX Fragment */}
      <>
        <p>This is inside a JSX fragment.</p>
        <p>It avoids extra divs.</p>
      </>

      {/* Rendering a list with map() */}
      <div>
        <h3>Favorite Fruits:</h3>
        <ul>
          {fruits.map((fruit, index) => (
            <li key={index}>{fruit}</li>
          ))}
        </ul>
      </div>

      {/* JSX auto-escapes text */}
      <div>
        <h3>Escaped Text:</h3>
        <p>{dangerousText}</p>
        <p dangerouslySetInnerHTML={{ __html: dangerousText1 }} />
      </div>
    </div>
  );
}

export default App;
/*
✅ Why Nothing Happens?
Modern browsers and React both prevent <script> inside innerHTML from executing when inserted 
dynamically via JavaScript.
This is not React's fault — it's actually browser security behavior. When you inject HTML 
dynamically via JavaScript like this:
<script>alert('Hacked!')</script>
*/