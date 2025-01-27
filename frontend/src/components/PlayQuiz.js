import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const PlayQuiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await API.get(`/quizzes/${quizId}`);
                setQuiz(response.data);
            } catch (err) {
                console.error('Failed to load quiz:', err.message);
                setMessage('Quiz not found or could not be loaded.');
            }
        };

        fetchQuiz();
    }, [quizId]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        if (currentQuestionIndex + 1 < quiz.questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setIsFinished(true);
        }
    };


    const handleSubmitResult = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await API.post(`/results/${quizId}`, { score });
            setMessage('Result submitted successfully!');
            setTimeout(() => navigate('/quizzes'), 2000);
        } catch (err) {
            console.error('Error submitting result:', err.message);
            if (err.response && err.response.data.message === 'Result already submitted for this quiz.') {
                setMessage('You have already completed this quiz. Your previous score is recorded.');
            } else {
                setMessage('Failed to submit result. Please try again later.');
            }
            setIsSubmitting(false);
        }
    };

    if (!quiz) return <p>Loading quiz...</p>;
    if (isFinished) {
        return (
            <div>
                <h1>Quiz Finished!</h1>
                <p>Your score: {score} / {quiz.questions.length}</p>
                {!isSubmitting && (
                    <button onClick={handleSubmitResult}>Submit Score</button>
                )}
                {message && <p>{message}</p>}
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div>
            <h1>{quiz.title}</h1>
            <p>{currentQuestion.text}</p>
            <ul>
                {currentQuestion.options.map((option, index) => (
                    <li key={index}>
                        <button
                            onClick={() => setSelectedAnswer(index)}
                            disabled={selectedAnswer !== null}
                            style={{
                                backgroundColor: selectedAnswer === index
                                    ? option.isCorrect
                                        ? 'green'
                                        : 'red'
                                    : '',
                            }}
                        >
                            {option.text}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedAnswer !== null && (
                <button onClick={() => handleAnswer(currentQuestion.options[selectedAnswer].isCorrect)}>
                    Next Question
                </button>
            )}
        </div>
    );
};

export default PlayQuiz;


