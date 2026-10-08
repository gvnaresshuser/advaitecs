import React, { useState, useEffect, useDebugValue } from 'react';

function useOnlineStatus() {
    const [online, setOnline] = useState(navigator.onLine);
    useDebugValue(online ? 'Online 🟢' : 'Offline 🔴');

    useEffect(() => {
        const update = () => setOnline(navigator.onLine);
        window.addEventListener('online', update);
        window.addEventListener('offline', update);
        return () => {
            window.removeEventListener('online', update);
            window.removeEventListener('offline', update);
        };
    }, []);

    return online;
}

export const DebugValueExample = () => {
    const online = useOnlineStatus();
    return <p>Status: {online ? 'Online' : 'Offline'}</p>;
};
