const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateOtp = require('../helpers/generateRandomToken');

// Create a new user function
const createNewUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Create a new user and generate a verification token
        const verificationToken = generateOtp();
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        let currentDate = new Date();
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresIn: currentDate.setHours(currentDate.getHours() + 1),
        });

        await newUser.save();

        if (!newUser) {
            return res.status(400).json({ message: "User creation failed" });
        }

        // Send a response with the created user data
        return res.status(201).json({ message: "User created successfully", newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// verify user controller function 
const verifyUser = async (req, res) => {
    const { verificationToken } = req.body;
    try {
        const user = await User.findOne({ verificationToken });

        if (!user) {
            return res.status(404).json({ error: "Invalid verification token" });
        }

        if (new Date() > user.verificationTokenExpiry) {
            await User.findByIdAndDelete(user._id);
            return res.status(403).json({ error: "Verification token has expired" });
        }

        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        user.isVerified = true;
        await user.save();

        return res.status(200).json({ message: "User verification successful" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


//get current user information
const getCurrentUser = async (req, res) => {
    const {userId} = req.user;

    try{
        const currentUser = await User.findById(userId).select('-password');

        if(!currentUser){
            return res.status(404).json({error: "User not found"});
        }

        return res.status(200).json({ user: currentUser});
    }catch(error){
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


module.exports = { createNewUser, verifyUser, getCurrentUser };

