import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: { type: String }, // Added bio field
        skills: [{ type: String }], // Added skills field
        resume: { type: String }, // URL or path to the resume file
        resumeOriginalName: { type: String }, // Original name of the uploaded resume file
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to Company model for recruiters
        profilePicture: { type: String, default: '' } // URL or path to profile picture
    }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
export default User;