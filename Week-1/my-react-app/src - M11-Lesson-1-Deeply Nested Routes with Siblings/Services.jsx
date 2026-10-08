import { Outlet, Link } from 'react-router-dom';

function Services() {
    return (
        <div>
            <h2>Services Page</h2>
            <ul>
                <li><Link to="webdev">Web Development</Link></li>
                <li><Link to="mobile">Mobile Apps</Link></li>
            </ul>

            <Outlet /> {/* 👈 Renders child routes */}
        </div>
    );
}

export default Services;
