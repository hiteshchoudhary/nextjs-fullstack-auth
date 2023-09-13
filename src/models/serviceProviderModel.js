import mongoose from "mongoose";

const ServiceProvidersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    phone: {
        type: Number,
        required: [true, "Please provide a username"],
        unique: true,
    },
    
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    services: {
        type: [],
        required: [true, "Add up to 3 services"]
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const ServiceProvider = mongoose.models.serviceproviders || mongoose.model("serviceproviders", ServiceProvidersSchema);

export default ServiceProvider;