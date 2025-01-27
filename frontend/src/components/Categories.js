import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import Button from "./Button";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get('/quizzes/categories'); // Pobierz kategorie quizów
                setCategories(response.data.categories);
            } catch (err) {
                console.error('Błąd podczas pobierania kategorii:', err.message);
                setError('Nie udało się pobrać kategorii.');
            }
        };

        fetchCategories();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Choose Category</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <Button  onClick={() => navigate(`/quizzes/start/${category.id}`)}>
                            {category.name}
                        </Button >
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
