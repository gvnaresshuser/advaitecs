const TemperatureInput = ({ temperature, onTemperatureChange }) => {
    return (
        <fieldset>
            <legend>Enter temperature in Celsius:</legend>
            <input
                type="number"
                value={temperature}
                onChange={(e) => onTemperatureChange(e.target.value)}
            />
        </fieldset>
    );
};

export default TemperatureInput;
