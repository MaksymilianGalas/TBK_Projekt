import React, { useState, useEffect } from 'react';
import API from '../services/api';

const UserSettings = () => {
    const [settings, setSettings] = useState({
        language: 'en',
        notifications: true,
    });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');


    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await API.get('/users/settings');
                setSettings(response.data.settings);
            } catch (err) {
                console.error('Error fetching settings:', err.message);
                setMessage('Failed to load settings.');
            }
        };

        fetchSettings();
    }, []);


    const handleSaveSettings = async (e) => {
        e.preventDefault();
        try {
            await API.put('/users/settings', settings);
            setMessage('Settings updated successfully!');
        } catch (err) {
            console.error('Error updating settings:', err.message);
            setMessage('Failed to update settings.');
        }
    };


    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await API.put('/users/change-password', { currentPassword, newPassword });
            setPasswordMessage('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
        } catch (err) {
            console.error('Error changing password:', err.message);
            setPasswordMessage('Failed to change password.');
        }
    };

    return (
        <div>
            <h1>User Settings</h1>
            <form onSubmit={handleSaveSettings}>
                <label>
                    Language:
                    <select
                        value={settings.language}
                        onChange={(e) =>
                            setSettings({ ...settings, language: e.target.value })
                        }
                    >
                        <option value="en">English</option>
                        <option value="pl">Polish</option>
                    </select>
                </label>
                <label>
                    Notifications:
                    <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) =>
                            setSettings({ ...settings, notifications: e.target.checked })
                        }
                    />
                </label>
                <button type="submit">Save Settings</button>
            </form>
            {message && <p>{message}</p>}

            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Change Password</button>
            </form>
            {passwordMessage && <p>{passwordMessage}</p>}
        </div>
    );
};

export default UserSettings;
