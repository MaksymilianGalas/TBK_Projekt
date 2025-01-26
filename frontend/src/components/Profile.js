import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // oken z localStorage
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (err) {
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
            <h1>Profile</h1>
            <p>Email: {user.email}</p>
            <p>Points: {user.points || 0}</p>
            <p>Role: {user.role}</p>
        </div>
    );
};

export default Profile;
