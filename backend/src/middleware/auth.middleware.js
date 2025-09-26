import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token) return res.status(401).json({ message: "Unauthorized - no token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({ message: "Unauthorized - invalid token" });

        const user = await User.findById(decoded.id).select("-password");
        if(!user) return res.status(401).json({ message: "No user found" });

        req.user = user;
        next();
    } catch (error) {
        console.log("Error verifying token", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default protect;