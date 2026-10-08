import React, { useState, useEffect } from 'react';

export function withLoader(WrappedComponent, delay = 2000) {
    return function LoaderComponent(props) {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => setLoading(false), delay);
            return () => clearTimeout(timer);
        }, []);

        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-[200px] text-blue-600">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                    <span className="ml-2">Loading User Data...</span>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
}
