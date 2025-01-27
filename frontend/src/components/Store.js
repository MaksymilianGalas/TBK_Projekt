import Button from "./Button";

import React, { useState, useEffect } from 'react';
import API from '../services/api';

const Store = () => {
    const [message, setMessage] = useState('');
    const [points, setPoints] = useState(0);
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await API.get('/users/me');
                setPoints(response.data.points);
                setInventory(response.data.inventory || []);
            } catch (err) {
                console.error('Error fetching user data:', err.message);
            }
        };

        fetchUserData();
    }, []);

    const handleBuyItem = async (itemName, cost) => {
        try {
            const response = await API.post('/users/buy-item', { itemName, cost });
            setMessage(response.data.message);
            setPoints(response.data.points); // Aktualizacja punktów po zakupie
            setInventory(response.data.inventory); // Aktualizacja ekwipunku
        } catch (err) {
            console.error('Error buying item:', err.message);
            setMessage('Failed to buy item. Please try again.');
        }
    };

    return (
        <div>
            <h1>Store</h1>
            <p>Your points: {points}</p>
            <h2>Inventory</h2>
            <ul>
                {inventory.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h2>Items for Sale</h2>
            <Button onClick={() => handleBuyItem('Gold Avatar', 10)}>Buy Gold Avatar (10 points)</Button>
            <Button onClick={() => handleBuyItem('Silver Avatar', 5)}>Buy Silver Avatar (5 points)</Button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Store;
