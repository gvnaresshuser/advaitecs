import React from 'react';
import useToggle from '../hooks/useToggle';

function ToggleComponent() {
    const [isVisible, toggleVisibility] = useToggle();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button onClick={toggleVisibility}>
                {isVisible ? 'Hide' : 'Show'} Message
            </button>
            {isVisible && <p style={{ marginTop: '20px' }}>👋 Hello! I’m visible now.</p>}
        </div>
    );
}

export default ToggleComponent;
