import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user = User.findOne({ email });
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
                token: newUser.token,
                profilePic: newUser.profilePic
            });
        }else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};



export default { signup };