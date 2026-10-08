import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate logout logic
        setTimeout(() => {
            // Clear auth logic here if needed
            navigate('/');
        }, 2000);
    }, []);

    return <h3>Logging out...</h3>;
};

export default LogoutPage;
