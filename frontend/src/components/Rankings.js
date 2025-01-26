import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rankings = () => {
    const [rankings, setRankings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/rankings`);
                setRankings(response.data);
            } catch (err) {
                setError('Failed to fetch rankings.');
            }
        };

        fetchRankings();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Rankings</h1>
            <ul>
                {rankings.map((user, index) => (
                    <li key={index}>
                        {index + 1}. {user.name} - {user.points} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Rankings;
