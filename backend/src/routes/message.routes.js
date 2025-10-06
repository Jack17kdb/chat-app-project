import express from "express";
import protect from "../middleware/auth.middleware.js";
import messageController from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protect, messageController.getUsers);
router.get("/:id", protect, messageController.getMessages);
router.post("/send/:id", protect, messageController.sendMessages);

export default router;
