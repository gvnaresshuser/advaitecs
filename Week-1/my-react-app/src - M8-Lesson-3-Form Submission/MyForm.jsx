import React, { useState } from 'react';

function MyForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic
        console.log('Form submitted:', formData);
        // Reset form fields
        setFormData({
            username: '',
            email: ''
        });
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
