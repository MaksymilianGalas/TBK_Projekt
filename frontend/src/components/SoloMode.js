import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Button from "./Button";

const SoloMode = () => {
    const [question, setQuestion] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await API.get('/quizzes/solo');
                setQuestion(response.data);
            } catch (err) {
                console.error('Failed to fetch question:', err.message);
                setError('Failed to load question.');
            }
        };

        fetchQuestion();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!question) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Solo Mode</h1>
            <p>{question.text}</p>
            <Button  onClick={() => console.log('Odpowiedź wybrana!')}>Answer</Button >
        </div>
    );
};

export default SoloMode;
