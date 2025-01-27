import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "./Button";

const PlayMode = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Choose Your Play Mode</h1>
            <Button  onClick={() => navigate('/quizzes/solo')}>Solo Mode</Button >
            <Button  onClick={() => navigate('/quizzes/graphic')}>Graphic Mode</Button >
        </div>
    );
};

export default PlayMode;
