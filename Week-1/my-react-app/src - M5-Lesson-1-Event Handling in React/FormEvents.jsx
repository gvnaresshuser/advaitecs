//📝 3. Form & Input Events
//👉 onChange, onSubmit, onFocus, onBlur;
function FormEvents() {
    const handleChange = (e) => {
        console.log(`Value changed: ${e.target.value}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted!");
    };

    const handleFocus = () => console.log("Input focused!");
    const handleBlur = () => console.log("Input blurred!");

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter something"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
export default FormEvents;