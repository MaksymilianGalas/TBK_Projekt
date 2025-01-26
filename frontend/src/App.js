import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Rankings from './components/Rankings';

function App() {
    return (
        <Router>
            <header>
                <h1>Frontend App</h1>
            </header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </nav>
            <div className="container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <h2>Welcome to the App</h2>
                                <p>This is the main page of the application.</p>
                            </div>
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/rankings" element={<Rankings />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
