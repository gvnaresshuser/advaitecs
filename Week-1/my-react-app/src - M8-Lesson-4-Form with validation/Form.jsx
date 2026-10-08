import React, { useState } from 'react';
import './Form.css';

function Form() {
    const initialFormData = {
        name: '',
        email: '',
        message: '',
        dropdown: 'Select',
        radio: '',
        checkbox: false
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null); // 👈 for table display

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmittedData(formData); // 👈 show in table
            alert('✅ Form submitted successfully!');
            setFormData(initialFormData); // reset form
            setErrors({});
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
            isValid = false;
        }

        if (formData.dropdown === 'Select') {
            errors.dropdown = 'Please select a valid option';
            isValid = false;
        }

        if (!formData.radio) {
            errors.radio = 'Please select a radio option';
            isValid = false;
        }

        if (!formData.checkbox) {
            errors.checkbox = 'You must agree to continue';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <div className="form-container">
            <h2>React Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Message:</label>
                    <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>

                <div className="form-group">
                    <label>Dropdown:</label>
                    <select name="dropdown" value={formData.dropdown} onChange={handleChange}>
                        <option value="Select" disabled>Select</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                    </select>
                    {errors.dropdown && <span className="error">{errors.dropdown}</span>}
                </div>

                <div className="form-group">
                    <label>Radio:</label>
                    <label><input type="radio" name="radio" value="Option 1" checked={formData.radio === 'Option 1'} onChange={handleChange} /> Option 1</label>
                    <label><input type="radio" name="radio" value="Option 2" checked={formData.radio === 'Option 2'} onChange={handleChange} /> Option 2</label>
                    <label><input type="radio" name="radio" value="Option 3" checked={formData.radio === 'Option 3'} onChange={handleChange} /> Option 3</label>
                    {errors.radio && <span className="error">{errors.radio}</span>}
                </div>

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="checkbox"
                            checked={formData.checkbox}
                            onChange={handleChange}
                        /> I agree to the terms
                    </label>
                    {errors.checkbox && <span className="error">{errors.checkbox}</span>}
                </div>

                <button type="submit">Submit</button>
            </form>

            {submittedData && (
                <div className="result-table">
                    <h3>Submitted Data</h3>
                    <table>
                        <tbody>
                            <tr><td><strong>Name:</strong></td><td>{submittedData.name}</td></tr>
                            <tr><td><strong>Email:</strong></td><td>{submittedData.email}</td></tr>
                            <tr><td><strong>Message:</strong></td><td>{submittedData.message}</td></tr>
                            <tr><td><strong>Dropdown:</strong></td><td>{submittedData.dropdown}</td></tr>
                            <tr><td><strong>Radio:</strong></td><td>{submittedData.radio}</td></tr>
                            <tr><td><strong>Checkbox:</strong></td><td>{submittedData.checkbox ? 'Yes' : 'No'}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Form;
