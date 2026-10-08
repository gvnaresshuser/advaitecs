import { useState, useEffect } from "react";
import "./App.css";

function App() {
  console.log("APP");
  const [data, setData] = useState([]); //state variable - REFERENCE DATA
  const [count, setCount] = useState(0); //PRIMITIVE DATA - will rerender ONLY if data is CHANGED

  function handleClick() {
    //setCount((count)=>count+1);
    setCount(11); //count is always 11
  }

  const fetchData = async () => {
    console.log("FETCH DATA");
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      console.log(response);
      if (!response.ok) throw new Error("Network response was not ok");
      const datax = await response.json();
      console.log(datax);
      setData(datax);
      console.log("SET DATA");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //Runs infinitely if we call fetchData() directly inside your component:
  //fetchData();

  useEffect(() => {
    console.log("USE EFFECT");
    fetchData();
  }, []); //calls only once

  return (
    <div>
      <h2>Fetched Data</h2>
      <button onClick={fetchData}>REFRESH</button>&nbsp;
      <button onClick={handleClick}>Increment</button>
      <p>Count: {count}</p>
      <ul>
        {console.log("RENDERING")}
        {data.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
