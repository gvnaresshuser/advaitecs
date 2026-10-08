import React, { useState } from 'react';
import './Form.css';

function StudentRegistrationForm() {
    const initialFormData = {
        fullName: '',
        studentEmail: '',
        bio: '',
        course: 'Select',
        gender: '',
        agreeTerms: false
    };

    const [formData, setFormData] = useState(initialFormData);
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
        const newErrors = {};
        let valid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
            valid = false;
        }

        if (!formData.studentEmail.trim()) {
            newErrors.studentEmail = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.studentEmail)) {
            newErrors.studentEmail = 'Invalid email address';
            valid = false;
        }

        if (!formData.bio.trim()) {
            newErrors.bio = 'Bio cannot be empty';
            valid = false;
        }

        if (formData.course === 'Select') {
            newErrors.course = 'Please choose a course';
            valid = false;
        }

        if (!formData.gender) {
            newErrors.gender = 'Please select gender';
            valid = false;
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmittedData(formData);
            alert('✅ Student Registered Successfully!');
            setFormData(initialFormData);
            setErrors({});
        }
    };

    return (
        <div className="form-container">
            <h2>Student Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && <span className="error">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                    <label>Email Address:</label>
                    <input
                        type="email"
                        name="studentEmail"
                        value={formData.studentEmail}
                        onChange={handleChange}
                    />
                    {errors.studentEmail && <span className="error">{errors.studentEmail}</span>}
                </div>

                <div className="form-group">
                    <label>Short Bio:</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    ></textarea>
                    {errors.bio && <span className="error">{errors.bio}</span>}
                </div>

                <div className="form-group">
                    <label>Select Course:</label>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                    >
                        <option value="Select" disabled>Select</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="B.Sc">B.Sc</option>
                        <option value="B.Com">B.Com</option>
                        <option value="B.A">B.A</option>
                    </select>
                    {errors.course && <span className="error">{errors.course}</span>}
                </div>

                <div className="form-group">
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                        /> Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
                        /> Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Other"
                            checked={formData.gender === 'Other'}
                            onChange={handleChange}
                        /> Other
                    </label>
                    {errors.gender && <span className="error">{errors.gender}</span>}
                </div>

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                        /> I accept the terms and conditions
                    </label>
                    {errors.agreeTerms && <span className="error">{errors.agreeTerms}</span>}
                </div>

                <button type="submit">Register</button>
            </form>

            {submittedData && (
                <div className="result-table">
                    <h3>Submitted Data</h3>
                    <table>
                        <tbody>
                            <tr><td><strong>Full Name:</strong></td><td>{submittedData.fullName}</td></tr>
                            <tr><td><strong>Email:</strong></td><td>{submittedData.studentEmail}</td></tr>
                            <tr><td><strong>Bio:</strong></td><td>{submittedData.bio}</td></tr>
                            <tr><td><strong>Course:</strong></td><td>{submittedData.course}</td></tr>
                            <tr><td><strong>Gender:</strong></td><td>{submittedData.gender}</td></tr>
                            <tr><td><strong>Agreed:</strong></td><td>{submittedData.agreeTerms ? 'Yes' : 'No'}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default StudentRegistrationForm;
