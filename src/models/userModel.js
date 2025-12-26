import { verify } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        // trim: true,
        // minlength: [3, "Username must be at least 3 characters long"],
        // maxlength: [30, "Username cannot exceed 30 characters"],
    },

    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: true,
        // trim: true,
        // lowercase: true,
        // match: [
        //     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        //     "Please provide a valid email address",
        // ],
    },

    password: {
        type: String,
        required: [true, "Please provide a password"],
        // minlength: [6, "Password must be at least 6 characters long"],
        // select: false,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;