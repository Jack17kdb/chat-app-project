import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", authController.signup);
router.get("/login", authController.login);

export default router;