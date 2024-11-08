const express = require('express');
const {loginUser, logoutUser, generateNewAccessToken} = require('../controllers/authControllers');
const requireSignin = require('../middleware/requireSignin');
const authRouter = express.Router();

authRouter.post('/login', loginUser);
authRouter.post('/logout', requireSignin, logoutUser);
authRouter.get('/token', generateNewAccessToken);










module.exports = authRouter;