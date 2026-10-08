import React from "react";
import { useLocation } from "react-router-dom";

const Page2 = () => {
    const location = useLocation();
    const data = location.state; // Accessing the passed state
    /*     
    👉 state here is a fixed property on the location object provided by React Router.
    You can’t rename location.state itself — that’s part of the React Router API. 
    */

    return (
        <div>
            <h1>Page 2</h1>
            <p>Name: {data?.name}</p>
            <p>Age: {data?.age}</p>
            <p>Profession: {data?.profession}</p>
        </div>
    );
};

export default Page2;
//Page2.jsx (Receiving Page)
//This page receives the props via the useLocation hook.