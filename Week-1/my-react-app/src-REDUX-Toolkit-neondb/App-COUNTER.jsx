import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./features/counter/counterSlice";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">React + Redux Toolkit + Express + Neon</p>
          <h1>Counter Management</h1>
          <p className="subtitle">
            Complete CRUD application using Redux Toolkit and PostgreSQL.
          </p>
        </div>
      </header>
      <main className="container">
        <section className="card">
          <div className="section-heading">
            <div>
              <p className="section-label">REDUX STATE</p>
              <h2>Counter</h2>
            </div>
            <div className="count-badge">{count}</div>
          </div>
          <div className="counter-display">
            <span>Current Count</span>
            <strong>{count}</strong>
          </div>
          <div className="button-row">
            <button
              className="btn btn-secondary"
              onClick={() => dispatch(decrement())}
            >
              − Decrement
            </button>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(increment())}
            >
              + Increment
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
export default App;
