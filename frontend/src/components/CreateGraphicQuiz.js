import React, { useState } from 'react';
import API from '../services/api';

const CreateGraphicQuiz = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [message, setMessage] = useState('');

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { text: '', image: '', answers: ['', '', '', ''], correctAnswer: '' },
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/quizzes/graphic', { title, description, questions });
            setMessage('Graphic quiz created successfully!');
            setTitle('');
            setDescription('');
            setQuestions([]);
        } catch (err) {
            console.error('Error creating graphic quiz:', err.message);
            setMessage('Failed to create graphic quiz.');
        }
    };

    return (
        <div>
            <h1>Create Graphic Quiz</h1>
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

                <h2>Questions</h2>
                {questions.map((question, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Question Text"
                            value={question.text}
                            onChange={(e) =>
                                setQuestions(
                                    questions.map((q, i) =>
                                        i === index ? { ...q, text: e.target.value } : q
                                    )
                                )
                            }
                        />
                        <input
                            type="text"
                            placeholder="Image URL (Optional)"
                            value={question.image}
                            onChange={(e) =>
                                setQuestions(
                                    questions.map((q, i) =>
                                        i === index ? { ...q, image: e.target.value } : q
                                    )
                                )
                            }
                        />
                        {question.answers.map((answer, i) => (
                            <input
                                key={i}
                                type="text"
                                placeholder={`Answer ${i + 1}`}
                                value={answer}
                                onChange={(e) =>
                                    setQuestions(
                                        questions.map((q, qIndex) =>
                                            qIndex === index
                                                ? {
                                                    ...q,
                                                    answers: q.answers.map((a, aIndex) =>
                                                        aIndex === i ? e.target.value : a
                                                    ),
                                                }
                                                : q
                                        )
                                    )
                                }
                            />
                        ))}
                        <input
                            type="text"
                            placeholder="Correct Answer"
                            value={question.correctAnswer}
                            onChange={(e) =>
                                setQuestions(
                                    questions.map((q, i) =>
                                        i === index ? { ...q, correctAnswer: e.target.value } : q
                                    )
                                )
                            }
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddQuestion}>
                    Add Question
                </button>
                <button type="submit">Create Quiz</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateGraphicQuiz;
