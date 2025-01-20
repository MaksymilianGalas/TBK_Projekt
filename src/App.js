const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');
const pointsRoutes = require('./routes/pointsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use('/results', resultRoutes);
app.use('/points', pointsRoutes);
app.use('/notifications', notificationRoutes);
app.use('/admin', adminRoutes);

// Middleware
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/users', userRoutes);

module.exports = app;
