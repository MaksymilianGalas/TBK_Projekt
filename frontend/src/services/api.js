import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // url backendu z .env
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('Authorization');
    if (token) {
        config.headers.Authorization = token;
    } else {
        delete config.headers.Authorization;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const registerUser = async (email, password) => {
    try {
        const response = await API.post('/users/register', { email, password });
        console.log('Registering user with:', email, password);

        return response.data;
    } catch (error) {
        console.error('Error during registration:', error.response.data);
        throw error;
    }
};


export const loginUser = async (email, password) => {
    try {
        console.log('Attempting to log in with:', email, password); // Debugowanie
        const response = await API.post('/users/login', { email, password }); // Zmieniona ścieżka
        console.log('Login successful:', response.data); // Debugowanie
        return response.data;
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        throw error;
    }
};

export default API;