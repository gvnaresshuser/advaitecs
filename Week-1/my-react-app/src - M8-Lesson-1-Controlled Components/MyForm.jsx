import React, { useState } from 'react';

function MyForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    //Computed Property Names (ES6 feature) - CHECK SCREENS FOR NOTES
    //[name]: value, // becomes { email: "user@example.com" }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission with formData
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default MyForm;
