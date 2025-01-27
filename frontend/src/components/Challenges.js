import React, { useState, useEffect } from 'react';
import API from '../services/api';

const Challenges = () => {
    const [totalPoints, setTotalPoints] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(false);

    useEffect(() => {
        const fetchTotalPoints = async () => {
            try {
                const response = await API.get('/users/total-points');
                setTotalPoints(response.data.points);

                if (response.data.points >= 10) {
                    setChallengeCompleted(true);
                }
            } catch (err) {
                console.error('Error fetching total points:', err.message);
            }
        };

        fetchTotalPoints();
    }, []);

    return (
        <div>
            <h1>Challenges</h1>
            <h2>Score 10 points to unlock a profile border!</h2>
            <p>Your total points: {totalPoints}</p>
            {challengeCompleted ? (
                <p>Challenge completed! Your profile now has a border!</p>
            ) : (
                <p>Keep going! You need {10 - totalPoints} more points.</p>
            )}
        </div>
    );
};

export default Challenges;
