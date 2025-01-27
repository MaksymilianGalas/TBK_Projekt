import Button from "./Button";
import React, { useState } from 'react';
import API from '../services/api';

const UnlockFeatures = () => {
    const [message, setMessage] = useState('');

    const handleUnlockPremium = async () => {
        try {
            const response = await API.post('/users/premium');
            setMessage(response.data.message);
        } catch (err) {
            console.error('Error unlocking premium:', err.message);
            if (err.response && err.response.status === 403) {
                setMessage('You are not the top user in the rankings.');
            } else if (err.response && err.response.status === 400) {
                setMessage('You are already a Premium user.');
            } else {
                setMessage('Failed to unlock premium. Please try again.');
            }
        }
    };

    return (
        <div>
            <h1>Unlock Features</h1>
            <Button onClick={handleUnlockPremium}>Unlock Premium</Button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UnlockFeatures;
