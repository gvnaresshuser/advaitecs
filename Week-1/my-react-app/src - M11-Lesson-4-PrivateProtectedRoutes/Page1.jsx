import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Page1 = () => {
    const navigate = useNavigate();

    const dataToPass = {
        name: "John Doe",
        age: 28,
        profession: "Developer",
    };

    return (
        <div>
            <h1>ADVANCED ROUTER</h1>
            {/* Option 1: Using Link */}
              <Link style={{background:"blue"}} to="/page2" state={dataToPass}>
                Go to Page 2 with Props
            </Link>&nbsp;

            {/* Option 2: Using navigate */}
            <button  onClick={() => navigate("/page2", { state: dataToPass })}>
                Go to Page 2 with Props
            </button>
        </div>
    );
};

export default Page1;
//Page1.jsx (Sending Page)
//This page includes a button or link that navigates to the second page and passes props.