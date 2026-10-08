import React, { useRef, useState } from 'react';

function UncontrolledForm() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;

        // Save to state
        setFormData({ name, email });

        console.log("Submitted Data:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("formData:", formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" ref={nameRef} />
            </label>
            <br /><br />
            <label>
                Email:
                <input type="email" ref={emailRef} />
            </label>
            <br /><br />
            <button type="submit">Submit</button>

            {/* Show formData below form (optional) */}
            <div style={{ marginTop: '20px' }}>
                <h4>Submitted Data:</h4>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
            </div>
        </form>
    );
}

export default UncontrolledForm;
