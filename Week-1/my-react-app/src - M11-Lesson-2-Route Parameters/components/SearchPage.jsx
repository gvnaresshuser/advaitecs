// src/components/SearchPage.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const term = searchParams.get('term');
    return <h2>Search Term: {term}</h2>;
}

export default SearchPage;