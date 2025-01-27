import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Rankings from './components/Rankings';
import Quizzes from './components/Quizzes';
import Store from './components/Store';
import Challenges from "./components/Challenges";
import UnlockFeatures from "./components/UnlockFeatures";
import PlayMode from './components/PlayMode';
import SoloMode from './components/SoloMode';
import GraphicMode from './components/GraphicMode';
import Categories from './components/Categories';
import CreateQuiz from './components/CreateQuiz';
import CreateGraphicQuiz from './components/CreateGraphicQuiz';
import QuizForm from './components/QuizForm';
import QuestionsManager from './components/QuestionsManager';
import PlayQuiz from './components/PlayQuiz';
import UserSettings from './components/UserSettings';
import Achievements from './components/Achievements';
import UserStats from './components/UserStats';

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
                <Link to="/profile">Profile</Link>
                <Link to="/rankings">Rankings</Link>
                <Link to="/quizzes">Quizzes</Link>
                <Link to="/store">Store</Link>
                <Link to="/features/unlock">Unlock Features</Link>
                <Link to="/challenges">Challenges</Link>
                <Link to="/settings">Settings</Link>
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
                    <Route path="/settings" element={<UserSettings />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/stats" element={<UserStats />} />
                    <Route path="/play-mode" element={<PlayMode />} />
                    <Route path="/quizzes/solo" element={<SoloMode />} />
                    <Route path="/quizzes/graphic" element={<GraphicMode />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/rankings" element={<Rankings />} />
                    <Route path="/quizzes" element={<Quizzes />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/features/unlock" element={<UnlockFeatures />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="/quizzes/categories" element={<Categories />} />
                    <Route path="/quizzes/custom" element={<CreateQuiz />} />
                    <Route path="/quizzes/graphic" element={<GraphicMode />} />
                    <Route path="/quizzes/create-graphic" element={<CreateGraphicQuiz />} />
                    <Route path="/quizzes/edit/:id" element={<QuizForm isEdit />} />
                    <Route path="/quizzes/:quizId/questions" element={<QuestionsManager />} />
                    <Route path="/quizzes/:quizId" element={<PlayQuiz />} />
                    <Route path="/quizzes/add" element={<QuizForm isEdit={false} />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
