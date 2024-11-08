const mongoose = require('mongoose');
const { Schema } = mongoose; // Extract Schema from mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('User', userSchema);
