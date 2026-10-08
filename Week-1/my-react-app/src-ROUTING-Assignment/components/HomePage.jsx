import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div style={{ padding: 20 }}>
            <h2>Welcome to MyReactApp</h2>
            <p>Explore various routing and data transfer techniques!</p>

            <ul>
                <li><Link to="/profile/JohnDoe">View Profile (Route Params)</Link></li>
                <li><Link to="/search?query=reactjs">Search for React (Query Params)</Link></li>
                <li>
                    <Link to="/details" state={{ id: 10, title: 'React Basics' }}>
                        View Details (State)
                    </Link>
                </li>
            </ul>
        </div>
    );
}
