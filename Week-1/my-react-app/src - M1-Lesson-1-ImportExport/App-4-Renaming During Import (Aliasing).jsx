//4. Renaming During Import (Aliasing)
import { multiply as mul } from './utils'; // Alias "multiply" as "mul"
import "./App.css";
function App() {
  return <p>2 × 5 = {mul(2, 5)}</p>;
}
export default App;