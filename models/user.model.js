import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'owner', 'deliveryBoy'],
        required: true
    },
    mobile: {
        type: String,
    },
    password: {
        type: String
    },
    resetOtp: {
        type: String
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
    otpExpiry: {
        type: Date,
    }
}, { timestamps: true })


const user = mongoose.model("User", userSchema);

export default user;