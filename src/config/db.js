const mongoose = require('mongoose');
//mongodb+srv://s27479:QBBYqk4oKfwB0RXV@cluster0.4p2hy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
