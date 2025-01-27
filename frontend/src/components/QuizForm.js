import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const QuizForm = ({ isEdit = false }) => {
    const { id } = useParams(); // Używane tylko w trybie edycji
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        text: '',
        options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
        ],
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit && id) {
            const fetchQuiz = async () => {
                try {
                    const response = await API.get(`/quizzes/${id}`);
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setQuestions(response.data.questions || []);
                } catch (err) {
                    console.error('Error fetching quiz:', err.message);
                    setMessage('Failed to load quiz.');
                }
            };
            fetchQuiz();
        }
    }, [isEdit, id]);

    const handleAddQuestion = () => {
        const correctAnswersCount = newQuestion.options.filter((o) => o.isCorrect).length;
        if (!newQuestion.text.trim() || correctAnswersCount !== 1) {
            setMessage('Each question must have a text and exactly one correct answer.');
            return;
        }

        setQuestions([...questions, newQuestion]);
        setNewQuestion({
            text: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ],
        });
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja: tytuł, opis i przynajmniej jedno pytanie
        if (!title.trim() || !description.trim() || questions.length === 0) {
            setMessage('Quiz must have a title, description, and at least one question.');
            return;
        }

        try {
            if (isEdit) {
                await API.put(`/quizzes/${id}`, { title, description, questions });
                setMessage('Quiz updated successfully!');
            } else {
                await API.post('/quizzes', { title, description, questions });
                setMessage('Quiz created successfully!');
            }
            navigate('/quizzes');
        } catch (err) {
            console.error('Error saving quiz:', err.message);
            setMessage('Failed to save quiz.');
        }
    };

    return (
        <div>
            <h1>{isEdit ? 'Edit Quiz' : 'Create Quiz'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">{isEdit ? 'Update Quiz' : 'Create Quiz'}</button>
            </form>

            <h2>Questions</h2>
            {questions.map((q, index) => (
                <div key={index}>
                    <p>{q.text}</p>
                    <ul>
                        {q.options.map((option, i) => (
                            <li key={i}>
                                {option.text} {option.isCorrect ? '(Correct)' : ''}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <h3>Add New Question</h3>
            <input
                type="text"
                placeholder="Question Text"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            />
            {newQuestion.options.map((option, i) => (
                <div key={i}>
                    <input
                        type="text"
                        placeholder={`Option ${i + 1}`}
                        value={option.text}
                        onChange={(e) =>
                            setNewQuestion({
                                ...newQuestion,
                                options: newQuestion.options.map((o, idx) =>
                                    idx === i ? { ...o, text: e.target.value } : o
                                ),
                            })
                        }
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={option.isCorrect || false}
                            onChange={(e) => {
                                const updatedOptions = newQuestion.options.map((o, idx) => ({
                                    ...o,
                                    isCorrect: idx === i ? e.target.checked : false,
                                }));
                                setNewQuestion({ ...newQuestion, options: updatedOptions });
                            }}
                        />
                        Correct Answer
                    </label>
                </div>
            ))}
            <button onClick={handleAddQuestion}>Add Question</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default QuizForm;
