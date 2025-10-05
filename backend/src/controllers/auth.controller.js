import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../lib/emailService.js"
import { generateVerificationCode } from "../utils/generateVerificationCode.js"

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

        const verificationToken = generateVerificationCode()

        const newUser = new User({
            email,
            username,
            password: hash,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            console.log("User saved successfully");

            try {
                await sendVerificationEmail(email, verificationToken);
                console.log("Verification email sent successfully");
            } catch (emailError) {
                console.log("Error sending verification email:", emailError);
            }

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
                message: "Registration successful! Please check your email for verification."
            });
        }else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        if (!token) return res.status(400).json({ message: "Please provide token" });

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if(!user) return res.status(400).json({ message: "Invalid or expired verification token" });

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" })
    } catch (error) {
        console.log("Error in verifyEmail:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            isVerified: user.isVerified,
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

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try{
        if(!email) return res.status(400).json({ message: "Please enter your email" });
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ message: "No user found with that email" });
        const resetToken = generateVerificationCode();
        const resetTokenExpiresAt = Date.now() + 3600000;
        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt
        await user.save()
        await sendPasswordResetEmail(email, resetToken)
        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        console.log("Error sending reset email: ", error)
        res.status(500).json( {message: "Internal server error"} );
    }
}

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if(!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt)
        user.password = hash
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save()

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.log("Error in resetPassword:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const profileUpdate = async (req, res) => {
    const { profilePic } = req.body;
    try {
        if (!profilePic) return res.status(400).json({ message: "Please provide a profile picture" }).select("-password");
        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
        res.status(200).json(updatedUser);
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

export default { signup, login, logout, profileUpdate, checkAuth, verifyEmail, forgotPassword, resetPassword };
