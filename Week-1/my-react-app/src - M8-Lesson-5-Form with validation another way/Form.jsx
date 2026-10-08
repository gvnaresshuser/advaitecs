import React, { useState } from 'react';
import './Form.css';

function TextInput({ label, name, value, onChange, error }) {
    return (
        <div className="form-group">
            <label>{label}:</label>
            <input type="text" name={name} value={value} onChange={onChange} />
            {error && <span className="error">{error}</span>}
        </div>
    );
}

function EmailInput({ label, name, value, onChange, error }) {
    return (
        <div className="form-group">
            <label>{label}:</label>
            <input type="email" name={name} value={value} onChange={onChange} />
            {error && <span className="error">{error}</span>}
        </div>
    );
}

function TextAreaInput({ label, name, value, onChange, error }) {
    return (
        <div className="form-group">
            <label>{label}:</label>
            <textarea name={name} value={value} onChange={onChange}></textarea>
            {error && <span className="error">{error}</span>}
        </div>
    );
}

function SelectInput({ label, name, value, onChange, options, error }) {
    return (
        <div className="form-group">
            <label>{label}:</label>
            <select name={name} value={value} onChange={onChange}>
                <option value="">-- Select an option --</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            {error && <span className="error">{error}</span>}
        </div>
    );
}

function RadioButton({ label, name, value, checked, onChange }) {
    return (
        <label className="radio-option">
            <input type="radio" name={name} value={value} checked={checked} onChange={onChange} /> {value}
        </label>
    );
}

function CheckBox({ label, name, checked, onChange, error }) {
    return (
        <div className="form-group">
            <label>
                <input type="checkbox" name={name} checked={checked} onChange={onChange} /> {label}
            </label>
            {error && <span className="error">{error}</span>}
        </div>
    );
}

function Form() {
    const initialState = {
        name: '',
        profession: '',
        email: '',
        message: '',
        dropdown: '',
        radio: '',
        checkbox: false
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.profession.trim()) {
            newErrors.profession = 'Profession is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        if (!formData.dropdown) {
            newErrors.dropdown = 'Please select an option';
            isValid = false;
        }

        if (!formData.radio) {
            newErrors.radio = 'Please select a radio option';
            isValid = false;
        }

        if (!formData.checkbox) {
            newErrors.checkbox = 'You must accept the checkbox';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmittedData(formData);
        }
    };

    const handleReset = () => {
        setFormData(initialState);
        setErrors({});
        setSubmittedData(null);
    };

    return (
        <div className="form-container">
            <h2>React Form</h2>
            <form onSubmit={handleSubmit}>
                <TextInput label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                <TextInput label="Profession" name="profession" value={formData.profession} onChange={handleChange} error={errors.profession} />
                <EmailInput label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <TextAreaInput label="Message" name="message" value={formData.message} onChange={handleChange} error={errors.message} />
                <SelectInput
                    label="Dropdown"
                    name="dropdown"
                    value={formData.dropdown}
                    onChange={handleChange}
                    options={['Option 1', 'Option 2', 'Option 3']}
                    error={errors.dropdown}
                />

                <div className="form-group">
                    <label>Radio:</label>
                    <RadioButton label="Option 1" name="radio" value="Option 1" checked={formData.radio === 'Option 1'} onChange={handleChange} />
                    <RadioButton label="Option 2" name="radio" value="Option 2" checked={formData.radio === 'Option 2'} onChange={handleChange} />
                    <RadioButton label="Option 3" name="radio" value="Option 3" checked={formData.radio === 'Option 3'} onChange={handleChange} />
                    {errors.radio && <span className="error">{errors.radio}</span>}
                </div>

                <CheckBox label="I agree to terms" name="checkbox" checked={formData.checkbox} onChange={handleChange} error={errors.checkbox} />

                <button type="submit">Submit</button>
                <button type="button" onClick={handleReset} style={{ backgroundColor: '#6c757d', marginTop: '10px' }}>Reset</button>
            </form>

            {submittedData && (
                <div className="result-table">
                    <h3>Submitted Data</h3>
                    <table>
                        <tbody>
                            <tr><td><strong>Name</strong></td><td>{submittedData.name}</td></tr>
                            <tr><td><strong>Profession</strong></td><td>{submittedData.profession}</td></tr>
                            <tr><td><strong>Email</strong></td><td>{submittedData.email}</td></tr>                            
                            <tr><td><strong>Message</strong></td><td>{submittedData.message}</td></tr>
                            <tr><td><strong>Dropdown</strong></td><td>{submittedData.dropdown}</td></tr>
                            <tr><td><strong>Radio</strong></td><td>{submittedData.radio}</td></tr>
                            <tr><td><strong>Checkbox</strong></td><td>{submittedData.checkbox ? 'Yes' : 'No'}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Form;
