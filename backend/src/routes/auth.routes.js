import express from "express";
import authController from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.put("/profile-update", protect, authController.profileUpdate);
router.get("/check", protect, authController.checkAuth);
router.get("/verify-email", authController.verifyEmail);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.put("/username-update", authController.changeUsername);
router.put("/email-update", authController.changeEmail);
router.put("/password-update", authController.changePassword);
router.delete("/delete-account", authController.deleteAccount);

export default router;
