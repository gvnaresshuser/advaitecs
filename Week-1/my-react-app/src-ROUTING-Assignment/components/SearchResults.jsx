import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    return (
        <div style={{ padding: 20 }}>
            <h2>Search Results</h2>
            <p>Showing results for: <strong>{query}</strong></p>
        </div>
    );
}
