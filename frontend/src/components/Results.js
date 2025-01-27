import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const Results = () => {
    const { quizId } = useParams();
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await API.get(`/results/${quizId}`);
                setResults(response.data.results || []);
                console.log('Otrzymane wyniki dla quizu:', response.data.results);
            } catch (err) {
                console.error('Błąd podczas pobierania wyników:', err.message);
                setError('Nie udało się pobrać wyników.');
            }
        };

        fetchResults();
    }, [quizId]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Results for Quiz: {quizId}</h1>
            <ul>
                {results.map((result) => (
                    <li key={result.userId}>
                        {result.userName} - {result.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Results;
