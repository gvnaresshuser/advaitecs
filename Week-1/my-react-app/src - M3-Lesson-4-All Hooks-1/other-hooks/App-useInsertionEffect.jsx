import { useInsertionEffect } from "react";
import "./App.css";
function App() {
  useInsertionEffect(() => {
    // Create a <style> element
    const style = document.createElement("style");

    // Add dynamic CSS
    style.textContent = `
            .dynamic-class {
                color: white;
                background-color: blue;
                padding: 10px;
            }
        `;

    // Insert the <style> into <head>
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div className="dynamic-class">Styled with useInsertionEffect</div>;
}

export default App;
