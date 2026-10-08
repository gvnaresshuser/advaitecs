import React from 'react';
import './Page.css';

const About = () => {
    return (
        <div className="page-container">
            <h1 className="page-title">About Us</h1>
            <div className="card-grid">
                <div className="info-card">
                    <h3>Mission</h3>
                    <p>We aim to help developers learn and build awesome apps using modern tools like React.</p>
                </div>
                <div className="info-card">
                    <h3>Technologies</h3>
                    <p>We work with React, Vite, React Router, and modern ES6+ JavaScript.</p>
                </div>
                <div className="info-card">
                    <h3>Team</h3>
                    <p>A passionate team of developers, designers, and educators driven by innovation.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
//</About>
