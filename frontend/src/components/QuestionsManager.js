import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useParams } from 'react-router-dom';

const QuestionsManager = () => {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', '', '', ''] });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await API.get(`/quizzes/${quizId}`);
                setQuestions(response.data.questions);
            } catch (err) {
                console.error('Failed to fetch questions:', err.message);
                setMessage('Failed to fetch questions.');
            }
        };

        fetchQuestions();
    }, [quizId]);

    const handleAddQuestion = async () => {
        try {
            await API.post(`/questions/${quizId}`, newQuestion);
            setMessage('Question added successfully!');
            setNewQuestion({ text: '', options: ['', '', '', ''] });
        } catch (err) {
            console.error('Failed to add question:', err.message);
            setMessage('Failed to add question.');
        }
    };

    const handleUpdateQuestion = async (id, updatedQuestion) => {
        try {
            await API.put(`/questions/${id}`, updatedQuestion);
            setMessage('Question updated successfully!');
        } catch (err) {
            console.error('Failed to update question:', err.message);
            setMessage('Failed to update question.');
        }
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await API.delete(`/questions/${id}`);
            setMessage('Question deleted successfully!');
        } catch (err) {
            console.error('Failed to delete question:', err.message);
            setMessage('Failed to delete question.');
        }
    };

    return (
        <div>
            <h1>Manage Questions</h1>
            {questions.map((question) => (
                <div key={question._id}>
                    <p>{question.text}</p>
                    {question.options.map((option, index) => (
                        <p key={index}>{option.text}</p>
                    ))}
                    <button onClick={() => handleUpdateQuestion(question._id, question)}>
                        Edit
                    </button>
                    <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
                </div>
            ))}
            <h2>Add New Question</h2>
            <input
                type="text"
                placeholder="Question Text"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            />
            {newQuestion.options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                        setNewQuestion({
                            ...newQuestion,
                            options: newQuestion.options.map((opt, i) =>
                                i === index ? e.target.value : opt
                            ),
                        })
                    }
                />
            ))}
            <button onClick={handleAddQuestion}>Add Question</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default QuestionsManager;
