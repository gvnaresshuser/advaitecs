import { useState } from 'react';
import './App.css';

function App() {
  //MULTIPLE STATE VARIABLES
  /*  const [brand, setBrand] = useState("Ferrari");
   const [model, setModel] = useState("Roma");
   const [year, setYear] = useState("2023");
   const [color, setColor] = useState("Red"); */
  //----------------------------------------------
  const [car, setCar] = useState({
    brand: "Ferrari",
    model: "Roma",
    year: "2023",
    color: "Blue"
  });
  //UPDATE COLOR TO BLUE
  const changeColor = () => {
    //setCar({color:"Red"}); // THIS IS WRONG - OTHER VALUES ARE GONE
    //-----------------------------
    /*  setCar((prev)=>{
       return {...prev,color:"Red"}
     }); */
    //-----------------------------
    //you can give any name instead of prev...which means previous
    setCar((car) => {
      return { ...car, color: "Red" };
    });
  };
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useState Hook - 2
          </h1>
        </div>

        {/*       <h1>My Ferrari</h1>
      <h2>It is a Red Roma from 2023</h2> */}
        {/* ---------------------------------------------------- */}
        {/* <h1>My {brand}</h1>
        <h2>It is a {color} {model} from {year}</h2> */}
        {/* ---------------------------------------------------- */}
        <h1>My {car.brand}</h1>
        <h2>It is a {car.color} {car.model} from {car.year}</h2>
        <button onClick={changeColor}>Red</button>
      </section>
    </>
  );
}

export default App;
