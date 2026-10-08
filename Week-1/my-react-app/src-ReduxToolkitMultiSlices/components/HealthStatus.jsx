// src/components/HealthStatus.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HealthStatus = () => {
    const [isUp, setIsUp] = useState(null);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                //await axios.get('http://localhost:5000/api/users');
                await axios.get('http://localhost:5000/health');
                setIsUp(true);
            } catch (error) {
                setIsUp(false);
            }
        };

        checkHealth();
        const interval = setInterval(checkHealth, 5000); // recheck every 5 sec
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="health-status"
            style={{
                backgroundColor: isUp === null ? 'gray' : isUp ? 'limegreen' : 'red',
                color: 'white',
                padding: '5px 5px',
                borderRadius: '12px',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '0 0 10px 0px',//TRBL
            }}
        >
            {isUp === null ? 'Checking...' : isUp ? 'Postgresql Server is UP ✅' : 'Postgresql Server is DOWN ❌'}
        </div>
    );
};

export default HealthStatus;

//E:\MURALI\REACT-JS-TRAINING\my-react-app\backend>
