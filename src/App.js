const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');
const pointsRoutes = require('./routes/pointsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const rankingsRoutes = require('./routes/rankingsRoutes');
// const socialRoutes = require('./routes/socialRoutes');
// const achievementRoutes = require('./routes/achievementRoutes');
// const supportRoutes = require('./routes/supportRoutes');
// const storeRoutes = require('./routes/storeRoutes');
// const featureRoutes = require('./routes/featureRoutes');
// const challengeRoutes = require('./routes/challengeRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: false })); // "z polskiego na nasze"
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/authMiddleware', authMiddleware);
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);
app.use('/results', resultRoutes);
app.use('/points', pointsRoutes);
app.use('/rankings', rankingsRoutes);
app.use('/notifications', notificationRoutes);
app.use('/admin', adminRoutes);
// app.use('/store/personalizations', storeRoutes);
// app.use('/features/unlock', featureRoutes);
// app.use('/challenges', challengeRoutes);
// app.use('/social', socialRoutes);
// app.use('/achievements', achievementRoutes);
// app.use('/support/tickets', supportRoutes);
app.use('/feedback', feedbackRoutes);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


app.use('/users', userRoutes);

module.exports = app;
