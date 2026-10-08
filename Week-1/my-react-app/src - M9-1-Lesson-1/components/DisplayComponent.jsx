import React from 'react';

function DisplayComponent({ name }) {
    return (
        <p className="message">
            {name ? `Hello, ${name}!` : 'Your name will appear here...'}
        </p>
    );
}

export default DisplayComponent;
