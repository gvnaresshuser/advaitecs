import React, { useEffect, useRef, useState } from "react";
import ModalPortalNew from "./ModalPortalNew";
import "./App.css";
import "./App-modal.css";
import "./App-useRefCreatePortalsPersonalInfo.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const [submittedData, setSubmittedData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    occupation: "",
    age: "",
  });

  // Ref to first input
  const nameInputRef = useRef(null);

  // Automatically focus Name field when modal opens
  useEffect(() => {
    if (showModal && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showModal]);

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      occupation: "",
      age: "",
    });

    setSubmittedData(null);
    setShowModal(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedData(formData);
    setShowModal(false);
  };

  // Open modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Close modal without submitting
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="hero">
        <div className="hero-content">
          <span className="badge">React Portal Example</span>
          <h1>Personal Information</h1>
          <p>
            A beautiful example using React Portal, useRef, useEffect and
            useState.
          </p>
          <button className="open-btn" onClick={handleOpenModal}>
            ✨ Enter Your Details
          </button>
        </div>
      </header>
      {/* INFORMATION DISPLAY */}
      {submittedData && (
        <section className="result-section">
          <div className="result-card">
            <div className="success-icon">✓</div>

            <h2>Information Received</h2>

            <p className="success-message">
              Thank you! Your personal information has been successfully
              submitted.
            </p>

            <div className="information-grid">
              <div className="info-item">
                <span>👤 Full Name</span>
                <strong>{submittedData.fullName}</strong>
              </div>

              <div className="info-item">
                <span>📧 Email</span>
                <strong>{submittedData.email}</strong>
              </div>

              <div className="info-item">
                <span>📱 Phone</span>
                <strong>{submittedData.phone}</strong>
              </div>

              <div className="info-item">
                <span>📍 City</span>
                <strong>{submittedData.city}</strong>
              </div>

              <div className="info-item">
                <span>💼 Occupation</span>
                <strong>{submittedData.occupation}</strong>
              </div>

              <div className="info-item">
                <span>🎂 Age</span>
                <strong>{submittedData.age}</strong>
              </div>
            </div>

            <div className="result-actions">
              <button className="edit-btn" onClick={handleOpenModal}>
                ✏️ Edit Information
              </button>

              <button className="reset-btn" onClick={handleResetForm}>
                🔄 Reset Form
              </button>
            </div>
          </div>
        </section>
      )}

      {/* MODAL */}
      {showModal && (
        <ModalPortalNew>
          <div className="modal-header">
            <div>
              <span className="modal-badge">Personal Profile</span>

              <h2>Tell Us About Yourself</h2>

              <p>Please provide a few details about yourself.</p>
            </div>

            <button
              className="close-btn"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* NAME */}
              <div className="form-group">
                <label>Full Name</label>

                <input
                  ref={nameInputRef}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* PHONE */}
              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              {/* CITY */}
              <div className="form-group">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </div>

              {/* OCCUPATION */}
              <div className="form-group">
                <label>Occupation</label>

                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Software Developer"
                  required
                />
              </div>

              {/* AGE */}
              <div className="form-group">
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  min="1"
                  max="120"
                  required
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCloseModal}
              >
                Cancel
              </button>

              <button type="submit" className="submit-btn">
                ✓ Save Information
              </button>
            </div>
          </form>
        </ModalPortalNew>
      )}
    </div>
  );
};

export default App;
