import React, { useState, useEffect } from 'react';
import API from '../services/api';

const Rankings = () => {
    const [rankings, setRankings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await API.get('/rankings');
                setRankings(response.data);
            } catch (err) {
                console.error('Failed to fetch rankings:', err.message);
                setError('Failed to load rankings.');
            }
        };

        fetchRankings();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Player Rankings</h1>
            <ul>
                {rankings.map((entry, index) => (
                    <li key={index}>
                        {index + 1}. {entry._id.email} - {entry.totalScore} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Rankings;
