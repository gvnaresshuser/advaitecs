//3. Both Default and Named Exports in the Same File
import sayHello, { add } from './helpers';
import "./App.css";
function App() {
  return (
    <div>
      <button onClick={sayHello}>Say Hello</button>
      <p>2 + 3 = {add(2, 3)}</p>
    </div>
  );
}
export default App;