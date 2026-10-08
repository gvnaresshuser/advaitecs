import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  //UPDATE BASED ON PREVIOUS STATE
  /*  const increaseCount = () => {
     setCount(count + 1);
   }; */
  //--------------------------
  /*  const increaseCount = () => {
     setCount(count + 1);// 1
     setCount(count + 1);// 1
     setCount(count + 1);// 1
     setCount(count + 1);// 1
   }; */
  //--------------------------
  //DON'T FORGET return if using { return prev + 1; }
  /* const increaseCount = () => {
    console.log(count);
    setCount((prev) => { return prev + 1; });
    setCount((prev) => { return prev + 1; });
    setCount((prev) => { return prev + 1; });
    setCount((prev) => { return prev + 1; });
  }; */
  //--------------------------
 /*  const increaseCount = () => {
    console.log(count);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }; */
  //--------------------------
  const increaseCount = () => {
    console.log(count);
    setCount((count) => count + 1);// 1
    setCount((count) => count + 1);// 2
    setCount((count) => count + 1);// 3
    setCount((count) => count + 1);// 4
  };
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useState Hook - 3
          </h1>
        </div>
        <h1>Count:{count}</h1>
        {/* <button onClick={increaseCount}>Increase</button> */}
        <button onClick={increaseCount}>Increase By 4</button>
      </section>
    </>
  );
}

export default App;
