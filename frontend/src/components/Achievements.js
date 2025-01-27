import React, { useState, useEffect } from 'react';
import API from '../services/api';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await API.get('/users/achievements');
                setAchievements(response.data);
            } catch (err) {
                console.error('Error fetching achievements:', err.message);
                setError('Failed to load achievements.');
            }
        };

        fetchAchievements();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Your Achievements</h1>
            <ul>
                {achievements.map((achievement) => (
                    <li key={achievement.id}>
                        <strong>{achievement.title}</strong>: {achievement.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Achievements;
