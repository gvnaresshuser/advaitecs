//7. Combining Exports from an Index File (Barrel Export)
//import { sayHello, greet, add } from './utils/index';//importing as named export via index.js

//INDIVIDUAL IMPORTS
import sayHello from "./utils/sayHello"; //importing as default export
import { greet } from "./utils/greet";
import { add } from "./utils/math";

import "./App.css";
function App() {
  return (
    <div>
      <h1>Utility Demo</h1>
      <button onClick={sayHello}>Say Hello</button>
      <button onClick={() => greet("Murali")}>Greet Murali</button>
      <button onClick={greet("Murali2")}>Greet Murali2</button>
      <p>Sum: {add(1, 2)}</p>
    </div>
  );
}

export default App;
