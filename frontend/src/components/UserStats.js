import React, { useState, useEffect } from 'react';
import API from '../services/api';

const UserStats = () => {
    const [stats, setStats] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await API.get('/users/stats');
                setStats(response.data);
            } catch (err) {
                console.error('Error fetching stats:', err.message);
                setError('Failed to load stats.');
            }
        };

        fetchStats();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Your Stats</h1>
            <p>Completed Quizzes: {stats.completedQuizzes}</p>
            <p>Average Score: {stats.averageScore}</p>
        </div>
    );
};

export default UserStats;
