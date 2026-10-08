import React, { useState } from "react";
import TemperatureInput from "./TemperatureInput";

const Calculator = () => {
    const [temperature, setTemperature] = useState("");

    return (
        <div>
            <h2>Water Boiling Calculator</h2>
            <TemperatureInput
                temperature={temperature}
                onTemperatureChange={setTemperature}
            />
            <BoilingVerdict celsius={parseFloat(temperature)} />
        </div>
    );
};

const BoilingVerdict = ({ celsius }) => {
    if (isNaN(celsius)) return <p>Enter a valid number</p>;
    return (
        <p>
            {celsius >= 100
                ? "Water would boil at this temperature."
                : "Water would not boil yet."}
        </p>
    );
};

export default Calculator;
