import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await API.get('/quizzes');
                setQuizzes(response.data);

                const token = localStorage.getItem('Authorization');
                if (token) {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    setUserId(payload.userId);
                }
            } catch (err) {
                console.error('Failed to fetch quizzes:', err.message);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div>
            <h1>Available Quizzes</h1>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <strong>{quiz.title}</strong> - {quiz.description}
                        <button onClick={() => navigate(`/quizzes/${quiz._id}`)}>Start Quiz</button>
                        <button onClick={() => navigate(`/results/${quiz._id}`)}>View Results</button>
                        {userId === quiz.creator._id && (
                            <button className="edit-button" onClick={() => navigate(`/quizzes/edit/${quiz._id}`)}>
                                Edit Quiz
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <div className="add-quiz-container">
                <button className="add-quiz-button" onClick={() => navigate('/quizzes/add')}>
                    Add Quiz
                </button>
            </div>
        </div>
    );
};

export default Quizzes;
