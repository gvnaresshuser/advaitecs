import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
/*
useContext is done in 3 steps
creating the context - AppContext.jsx
providing the context - main.jsx
consuming the context
*/
function App() {
  return (
    <>
      <section id="center">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            useContext Hook
          </h1>
        </div>
        <Profile />
        <Footer />
      </section>
    </>
  );
}

export default App;
/*
In useContext, the word context specifically means:
A shared piece of data that React makes available to components 
without having to pass it through props.
*/
