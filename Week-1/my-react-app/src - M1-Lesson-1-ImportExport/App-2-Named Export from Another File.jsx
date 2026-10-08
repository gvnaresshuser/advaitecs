//2. Named Export from Another File
import { greet, add } from './myFunctions'; // Curly braces for named imports
import "./App.css";
function App() {
  return (
    <div>
      <button onClick={greet}>Greet</button>
      <p>2 + 3 = {add(2, 3)}</p>
    </div>
  );
}

export default App;
