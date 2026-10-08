import { useState } from 'react';
import './App.css';

function App() {

  /*  const counter = useState(0);
   console.log(counter); */
  //---------------------------------------
  /*  const counter = useState(0)[0];
  console.log(counter); */
  //---------------------------------------
  /*  const counter = useState(0)[0];
   const setCounter = useState(0)[1];
   console.log(counter);
   console.log(setCounter); */
  //---------------------------------------
  /* const [counter, setCounter] = useState(10);
  console.log(counter);
  console.log(setCounter); */
  //---------------------------------------
  /*   let color = "Red";
    const changeColor = () => {
      color = "Blue";
      //console.log(color);
    }; */
  //---------------------------------------
  const [color, setColor] = useState("Red");
  const changeColor = () => {
    setColor("Blue");
    console.log(color);
  };
  //---------------------------------------
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useState Hook - 1
          </h1>
         {/*  <p className="mt-2 text-sm sm:text-base text-yellow-100">
            Hooks are special functions that allow us to use state and other React features in functional components.
          </p> */}
        </div>

        {/* <h1>My Favourite color is Red!</h1> */}
        <h1>My Favourite color is {color}!</h1>
        <button onClick={changeColor}>Blue</button>

      </section>
    </>
  );
}

export default App;
