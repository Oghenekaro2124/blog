const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken, verifyToken } = require('../helpers/jwtHelpers');
const {
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN,
    JWT_SECRET,
} = require('../config/index');

console.log(ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, JWT_SECRET);

// User login controller function
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userWithEmailExist = await User.findOne({ email });
        if (!userWithEmailExist) {
            return res.status(404).json({ error: "User with email does not exist" });
        }
         
        if (!userWithEmailExist.isVerified) {
            return res.status(403).json({ error: "User account is not verified" });
        }
        const passwordMatch = await bcrypt.compare(password, userWithEmailExist.password);

        if (!passwordMatch) {
            return res.status(403).json({ error: "Invalid login credentials" });
        }

        const jwtPayload = {
            email: userWithEmailExist.email,
            id: userWithEmailExist._id,
            firstName: userWithEmailExist.firstName,
            lastName: userWithEmailExist.lastName
        };

        // Generate refresh token
        const refreshToken = generateToken(
            jwtPayload,
            JWT_SECRET,
            REFRESH_TOKEN_EXPIRES_IN
        );

        // Generate access token
        const accessToken = generateToken(
            jwtPayload,
            JWT_SECRET,
            ACCESS_TOKEN_EXPIRES_IN
        );

        // Cookie options
        const cookieOptions = {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        };

        return res
            .status(200)
            .cookie('accessToken', accessToken, cookieOptions)
            .json({ message: "User login successful", refreshToken });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


//logout user controller function
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

// generate new access token controller function
   const generateNewAccessToken = async (req, res) => {
    try {
    
        
        const refreshToken = req.headers['authorization']
        if (!refreshToken) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        if (refreshToken.split(' ')[0] !== 'Bearer') {
            return res.status(403).json({ error: "Invalid token" });
        }

        const payload = verifyToken(refreshToken.split(' ')[1], JWT_SECRET);

        if (!payload) {
            return res.status(403).json({ error: "Invalid token" });
        }
//access token payload
        const jwtPayload = {
            userId: payload.userId,
            firstName: payload.firstName,
            lastName: payload.lastName,
        };

        const accessToken = generateToken(jwtPayload, JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN);
// Cookie options
const cookieOptions = {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
    sameSite: 'none',
    secure: true,
};
        return res.status(200).cookie('accessToken', accessToken, cookieOptions).json({ message: "New access token generated successfully" });
    }catch(error) {
        res.status(500).json({ error: "Internal server error"});
    }
   }



module.exports = { loginUser, logoutUser, generateNewAccessToken };
