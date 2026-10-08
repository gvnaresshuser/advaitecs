import { useState, useEffect } from "react";
import "./App.css";

function App() {
  console.log("APP");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    console.log("FETCH DATA");
    try {
     /*  const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      ); */
       const response = await fetch(
         "https://jsonplaceholder.typicode.com/users",
         {
           // Adding method type
           method: "GET",
         },
       );;
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
  }, []);

  return (
    <div>
      <h2>Fetched Data</h2>
      <br />
      <ul>
        {console.log("RENDERING")}
        {data.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
