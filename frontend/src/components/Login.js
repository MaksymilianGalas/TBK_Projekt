import React, { useState } from 'react';

import axios from "axios";
import Button from "./Button";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
                email,
                password,
            });
            const token = response.data.token; // Pobierz token z odpowiedzi
            console.log('Received token:', token);

            // Zapisz token z prefiksem "Bearer" w localStorage
            localStorage.setItem('Authorization', `Bearer ${token}`);

            setMessage('Login successful!');
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setMessage('Login failed. Try again.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button  type="submit">Login</Button >
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
