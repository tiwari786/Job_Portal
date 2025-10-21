import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { fullName, email, contact, password, role } = req.body;
        //when user registers, they must provide fullName, email, contact, password, and role
        if (!fullName || !email || !contact || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        };

        //check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10); //10 rounds of salting
        const hasedPassword = await bcrypt.hash(password, salt);

        //create new user
        await User.create({
            fullName,
            email,
            contact,
            password: hasedPassword,
            role
        })
        return res.status(201).json({
            message: "User registered successfully",
            success: true
        })
    } catch (error) { 
        return res.status(500).json({
            message: "Error in registering user", 
            success: false  
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        //when user logs in, they must provide email,password and role
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        //check if user exists
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User does not exist with this email",
                success: false
            })
        }

        //check if password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }

        //check if role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Role does not match",
                success: false
            })
        }

        //generate jwt token
        const tokenData = {
            userId: user._id, //unique id of user
        }
        // sign the token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d' //token valid for 7 days
        });

        // send only necessary user data in response
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            contact: user.contact,
            role: user.role,
            profile: user.profile
        }

        // send token in cookie and response
        return res.status(200).cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
            httpOnly: true, //to prevent XSS attacks
            sameSite: 'strict', //to prevent CSRF attacks
        }).json({
            message: `Welcome back, ${user.fullName}`,
            user,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error in logging in",
            success: false
        })
    }
}


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in logging out",
            success: false
        })
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, contact, bio, skills } = req.body;
        const file = req.file;


        // Cloudinary logic to upload resume can be added here

        let skillsArray;

        if (skills) {
            skillsArray = skills.split(","); //convert skills string to array
        }

        const userId = req.id // from authMiddleware

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // update user profile

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (contact) user.contact = contact;
        if (bio) user.bio = bio;
        if (skills) user.skills = skillsArray


        // Resume logic here 

        await user.save(); // save updated user

        // send only necessary user data in response
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            contact: user.contact,
            role: user.role,
            profile: {
                skills: user.skills,
                bio: user.bio,
            },
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in updating profile",
            success: false
        })
    }
}

