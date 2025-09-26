import Message from "../models/messages.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error getting users", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getMessages = async (req, res) => {
    try {
        const { id:friendId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: friendId },
                { senderId: friendId, recieverId: myId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error getting messages", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error sending message", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default { getUsers, getMessages, sendMessages };