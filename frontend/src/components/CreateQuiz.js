import React, { useState } from 'react';
import API from '../services/api';
import Button from "./Button";

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/quizzes/custom', { title, description });
            setMessage('Quiz created successfully!');
        } catch (err) {
            console.error('Failed to create quiz:', err.message);
            setMessage('Failed to create quiz.');
        }
    };

    return (
        <div>
            <h1>Create Your Own Quiz</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Quiz Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Quiz Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button  type="submit">Create Quiz</Button >
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateQuiz;
