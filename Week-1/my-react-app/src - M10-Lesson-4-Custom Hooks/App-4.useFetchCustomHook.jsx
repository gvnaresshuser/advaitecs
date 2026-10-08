import React from "react";
import PostsList from "./components/PostsList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>useFetch Custom Hook Example</h1>
      <PostsList />
    </div>
  );
}

export default App;
