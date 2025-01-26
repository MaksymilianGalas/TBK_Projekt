const Notification = require('../models/notification');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.userId });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch notifications' });
    }
};

const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        notification.isRead = true;
        await notification.save();
        res.json(notification);
    } catch (err) {
        res.status(500).json({ error: 'Could not update notification' });
    }
};

module.exports = { getNotifications, markAsRead };
