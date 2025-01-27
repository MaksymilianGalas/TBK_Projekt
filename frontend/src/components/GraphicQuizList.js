import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const GraphicQuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGraphicQuizzes = async () => {
            try {
                const response = await API.get('/quizzes/graphic-list');
                setQuizzes(response.data);
            } catch (err) {
                console.error('Error fetching graphic quizzes:', err.message);
                setError('Failed to fetch graphic quizzes.');
            }
        };

        fetchGraphicQuizzes();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Graphic Quizzes</h1>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <strong>{quiz.title}</strong> - {quiz.description}
                        <button onClick={() => navigate(`/quizzes/graphic/${quiz._id}`)}>Start Quiz</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/quizzes/create-graphic')}>Add New Graphic Quiz</button>
        </div>
    );
};

export default GraphicQuizList;
