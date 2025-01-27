import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const ViewResults = () => {
    const { quizId } = useParams();
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await API.get(`/results/${quizId}`);
                setResults(response.data);
            } catch (err) {
                console.error('Failed to fetch results:', err.message);
                setError('Failed to load results.');
            }
        };

        fetchResults();
    }, [quizId]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Quiz Results</h1>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        {result.user.email} - {result.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewResults;
