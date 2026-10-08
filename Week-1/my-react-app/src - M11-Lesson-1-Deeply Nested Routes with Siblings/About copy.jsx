import { Outlet, Link } from 'react-router-dom';

function About() {
    return (
        <div>
            <h2>About Page</h2>
            <ul>
                <li><Link to="team">Our Team</Link></li>
                <li><Link to="mission">Our Mission</Link></li>
            </ul>

            <Outlet /> {/* 👈 Renders child routes */}
        </div>
    );
}

export default About;
