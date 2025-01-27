import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Attempting to register:', email, password);
        try {
            const data = await registerUser(email, password);
            console.log('Registration successful:', data);
            setMessage('Registration successful!');
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Registration failed. Try again.');
        }
    };


    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Register;
