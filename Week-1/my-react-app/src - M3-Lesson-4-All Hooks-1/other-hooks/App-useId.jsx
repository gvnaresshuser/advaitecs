import { useId } from "react";

function App() {
  const id = useId();
  const id2 = useId();

  return (
    <div>
      <label htmlFor={id}>Enter your name:</label>

      <input id={id} type="text" />

      <br />

      <label htmlFor={id2}>Enter your name:</label>

      <input id={id2} type="text" />
    </div>
  );
}

export default App;
