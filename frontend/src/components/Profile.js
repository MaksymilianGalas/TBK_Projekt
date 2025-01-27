import React, { useState, useEffect } from 'react';
import API from '../services/api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [stats, setStats] = useState([]);
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await API.get('/users/stats');
                setStats(response.data);
            } catch (err) {
                console.error('Failed to fetch stats:', err.message);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await API.get('/achievements/check');
                setAchievements(response.data);
            } catch (err) {
                console.error('Error fetching achievements:', err.message);
            }
        };

        fetchAchievements();
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {

                const token = localStorage.getItem('Authorization');
                if (!token) {
                    setError('You are not logged in.');
                    return;
                }

                console.log('Token:', token);


                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const decodedPayload = JSON.parse(atob(base64));
                const userId = decodedPayload.userId;

                console.log('Decoded Payload:', decodedPayload);
                console.log('User ID:', userId);


                const response = await API.get(`/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
            } catch (err) {
                console.error('Failed to fetch profile:', err.message);
                setError('Failed to fetch profile.');
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>My Account</h1>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <h2>Achievements</h2>
            <ul>
                {achievements.map((achievement) => (
                    <li key={achievement._id}>
                        <strong>{achievement.name}</strong> - {achievement.description} ({achievement.unlocked ? 'Unlocked' : 'Locked'})
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Profile;
