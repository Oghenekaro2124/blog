const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const blogRouter = require('./routes/blogRoutes');
const app = express();

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use ('/blogs', blogRouter);

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running' });
});

module.exports = app;
