const { verifyToken } = require('../helpers/jwtHelpers');
const { JWT_SECRET } = require('../config/index');

// Middleware function to require sign-in
const requireSignin = (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const payload = verifyToken(accessToken, JWT_SECRET);

        if (!payload) {
            return res.status(401).json({ error: "Invalid token. Authentication failed." });
        }

        // Attach the user information to the request object
        req.user = payload;

        
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};

module.exports = requireSignin;
