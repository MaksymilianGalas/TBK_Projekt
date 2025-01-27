import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Button from "./Button";

const GraphicMode = () => {
    const [question, setQuestion] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await API.get('/quizzes/graphic'); // Pobierz pytanie graficzne
                setQuestion(response.data);
            } catch (err) {
                console.error('Błąd podczas pobierania pytania:', err.message);
                setError('Nie udało się załadować pytania.');
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
            <h1>Graphic Mode</h1>
            <img src={question.image} alt="Question" />
            <p>{question.text}</p>
            <div>
                {question.answers.map((answer, index) => (
                    <Button  key={index} onClick={() => console.log(`Wybrano odpowiedź: ${answer}`)}>
                        {answer}
                    </Button >
                ))}
            </div>
        </div>
    );
};

export default GraphicMode;
