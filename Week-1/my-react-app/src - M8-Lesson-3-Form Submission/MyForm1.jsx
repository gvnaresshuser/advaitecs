import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function MyForm1() {
    const [formData, setFormData] = useState({ username: '', email: '' });
    const [errors, setErrors] = useState({});
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [submittedMessage, setSubmittedMessage] = useState('');
    const [submittedData, setSubmittedData] = useState(null);


    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        return newErrors;
    };

    const handleChange = (e) => {//AT A TIME YOU CAN CHANGE ONLY ONE INPUT
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSubmittedMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Submitted:', formData);
            setSubmittedMessage('✅ Form submitted successfully!');
            setSubmittedData(formData); // Save the submitted data
            setFormData({ username: '', email: '' });
            setSubmitAttempted(false);
        }
    };

    const handleReset = () => {
        setFormData({ username: '', email: '' });
        setErrors({});
        setSubmitAttempted(false);
        setSubmittedMessage('');
        setSubmittedData(null); // Clear submitted data
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>React Controlled Form</h2>

            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className={submitAttempted && errors.username ? 'input-error' : ''}
                ref={inputRef}
            />
            {submitAttempted && errors.username && (
                <div className="error-message">{errors.username}</div>
            )}

            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={submitAttempted && errors.email ? 'input-error' : ''}
            />
            {submitAttempted && errors.email && (
                <div className="error-message">{errors.email}</div>
            )}

            <button type="submit" style={{ marginTop: '20px', marginRight: '10px' }}>
                Submit
            </button>
            <button type="button" onClick={handleReset}>
                Reset
            </button>

             {submittedMessage && (
                <p style={{ color: 'green', marginTop: '15px' }}>{submittedMessage}</p>
            )}           

            {submittedData && (
                
                <div
                    style={{
                        marginTop: '30px',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h3
                        style={{
                            color: '#2c3e50',
                            marginBottom: '15px',
                            fontSize: '20px',
                            textShadow: '1px 1px #e0e0e0',
                        }}
                    >
                        ✅ Submitted Data
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr>
                                <td
                                    style={{
                                        padding: '10px',
                                        fontWeight: 'bold',
                                        backgroundColor: '#eaf2f8',
                                        border: '1px solid #ddd',
                                        width: '30%',
                                    }}
                                >
                                    Username
                                </td>
                                <td
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ddd',
                                    }}
                                >
                                    {submittedData.username}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        padding: '10px',
                                        fontWeight: 'bold',
                                        backgroundColor: '#eaf2f8',
                                        border: '1px solid #ddd',
                                    }}
                                >
                                    Email
                                </td>
                                <td
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ddd',
                                    }}
                                >
                                    {submittedData.email}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            )}

        </form>
        
    );
}

export default MyForm1;
