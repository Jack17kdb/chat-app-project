import Message from "../models/messages.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getSocketId, io } from "../lib/socketio.js";

const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id: friendId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: friendId },
                { senderId: friendId, receiverId: myId },
            ],
        }).populate({
            path: "replyTo",
            select: "text image senderId isDeleted",
            populate: {
                path: "senderId",
                select: "username profilePic"
            }
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error getting messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const sendMessages = async (req, res) => {
    try {
        const { text, image, replyTo } = req.body;
        const { id: receiverId } = req.params;
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
            replyTo: replyTo || null,
            image: imageUrl,
            isRead: false,
        });

        await newMessage.save();
        await newMessage.populate("replyTo", "text senderId isDeleted");

        const receiverSocketId = getSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const editMessage = async (req, res) => {
    try{
        const { messageId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        if (message.senderId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const fifteenMinutes = 15 * 60 * 1000;
        if (Date.now() - new Date(message.createdAt).getTime() > fifteenMinutes){
            return res.status(400).json({
                message: "Cannot edit messages older than 15 minutes"
            });
        }

        message.text = text;
        message.isEdited = true;
        message.editedAt = Date.now();
        await message.save();

        const receiverSocketId = getSocketId(message.receiverId);
        io.to(receiverSocketId).emit("messageEdited", message);

        res.status(201).json(message);
    } catch(error) {
        console.log("Error editing message", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { deleteForEveryone } = req.body;
        const userId = req.user._id;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        if (deleteForEveryone) {
            if (message.senderId.toString() !== userId.toString()) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            const oneHour = 60 * 60 * 1000;
            if (Date.now() - new Date(message.createdAt).getTime() > oneHour){
                return res.status(400).json({
                    message: "Cannot delete for everyone after 1 hour"
                });
            }

            message.isDeleted = true;
            message.deletedAt = Date.now();
            message.deletedBy = userId;
            message.text = "This message was deleted";
            message.image = null;
            await message.save();

            const receiverSocketId = getSocketId(message.receiverId);
            if(receiverSocketId) {
                io.to(receiverSocketId).emit("deletedMessage", {
                        messageId: message._id,
                        deleteForEveryone: true
                })
            }

        } else {
            return res.status(200).json({
                message: "Deleted for you",
                messageId
            });
        }

        res.status(200).json(message);
    } catch(error) {
        console.log("Error deleting message", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default { getUsers, getMessages, sendMessages, editMessage, deleteMessage };
