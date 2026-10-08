import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './About.css';

const About = () => {
    const linkStyle = {
        padding: '10px 20px',
        marginRight: '10px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: '5px',
        backgroundColor: '#f8f9fa',
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold',
        display: 'inline-block'
    };

    const activeStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        borderColor: '#007bff', // now this is safe since border is not shorthand
    };
    //---------------------------------- USING INLINE STYLES -------------------------------------
    return (
        <div style={{ padding: '20px', marginTop: '-40px' }}>
            <h2 style={{ marginBottom: '20px' }}>About Us</h2>
            <div>
                <NavLink
                    to="team"
                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
                >
                    Team
                </NavLink>

                <NavLink
                    to="mission"
                    style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
                >
                    Mission
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
    //------------------------------------ USING CLASSNAME ----------------------------------------
    /* return (
        <div className="about-container">
            <h2 className="about-title">About Us</h2>

            <div className="nav-links">
                <NavLink
                    to="team"
                    className={({ isActive }) =>
                        isActive ? 'link-btn active-link' : 'link-btn'
                    }
                >
                    Team
                </NavLink>

                <NavLink
                    to="mission"
                    className={({ isActive }) =>
                        isActive ? 'link-btn active-link' : 'link-btn'
                    }
                >
                    Mission
                </NavLink>
            </div>
            <Outlet />
        </div>
    ); */
    //--------------------------------------------------------------------------------
};

export default About;
