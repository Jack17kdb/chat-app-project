import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

const signup = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            username,
            password: hash
        })

        if (newUser) {
            generateToken(newUser._id, res);
            newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        }else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!user || !isMatch) return res.status(400).json({ message: "Invalid credentials" });
        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error logging in user", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("token", "", {maxAge: 0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error logging out user", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const profileUpdate = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) return res.status(400).json({ message: "Please provide a profile picture" });
        const userId = req.user._id; 

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
        res.status(200).json({message: "Profile picture updated successfully"});
    } catch (error) {
        console.log("Error updating profile picture", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error checking auth", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default { signup, login, logout, profileUpdate, checkAuth };