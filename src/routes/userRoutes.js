const express = require('express');
const { createNewUser, verifyUser, getCurrentUser } = require('../controllers/userControllers');
const requireSignin = require('../middleware/requireSignin');

const userRouter = express.Router();

// Route for creating a new user
userRouter.post('/', createNewUser);

// Route for verifying a user
userRouter.put('/verify', verifyUser);

// Route for getting the current user; protected by requireSignin middleware
userRouter.get('/me', requireSignin, getCurrentUser);

module.exports = userRouter;
