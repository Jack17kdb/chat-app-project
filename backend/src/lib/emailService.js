import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  try {
    await resend.emails.send({
      from: "ChitChat App <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Email - ChitChat Chat App",
      html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 40px 0;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
      <div style="background: linear-gradient(135deg, #6e00ff, #a100ff); padding: 20px; text-align: center; color: #fff;">
      <h1 style="margin: 0; font-size: 24px;">ChitChat Chat App</h1>
      </div>

      <div style="padding: 30px; text-align: center; color: #333;">
      <h2>Welcome to ChitChat Chat App!</h2>
      <p>Please verify your email by clicking below:</p>
      <a href="${verificationUrl}"
      style="display:inline-block;margin-top:20px;background:linear-gradient(90deg,#6e00ff,#a100ff);color:white;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:16px;font-weight:bold;">
      Verify Email
      </a>
      <p style="margin-top:25px;font-size:14px;color:#777;">
      If that doesn't work, copy and paste this link:
      </p>
      <p style="word-break:break-all;color:#6e00ff;">${verificationUrl}</p>
      </div>

      <div style="background-color:#f0f0f5;text-align:center;padding:15px;font-size:13px;color:#888;">
      <p>&copy; ${new Date().getFullYear()} ChitChat Chat App. All rights reserved.</p>
      </div>
      </div>
      </div>
      `,
    });

    console.log("Verification email sent successfully!");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  try {
    await resend.emails.send({
      from: "ChitChat App <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your Password - ChitChat Chat App",
      html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;background-color:#f4f4f9;margin:0;padding:40px 0;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.1);overflow:hidden;">
      <div style="background:linear-gradient(135deg,#ff0040,#ff6b81);padding:20px;text-align:center;color:#fff;">
      <h1 style="margin:0;font-size:24px;">ChitChat Chat App</h1>
      </div>

      <div style="padding:30px;text-align:center;color:#333;">
      <h2>Password Reset Request</h2>
      <p>Click the button below to reset your password:</p>
      <a href="${resetUrl}"
      style="display:inline-block;margin-top:20px;background:linear-gradient(90deg,#ff0040,#ff6b81);color:white;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:16px;font-weight:bold;">
      Reset Password
      </a>
      <p style="margin-top:25px;font-size:14px;color:#777;">
      Or copy this link:
      </p>
      <p style="word-break:break-all;color:#ff0040;">${resetUrl}</p>
      </div>

      <div style="background-color:#f0f0f5;text-align:center;padding:15px;font-size:13px;color:#888;">
      <p>&copy; ${new Date().getFullYear()} ChitChat Chat App. All rights reserved.</p>
      </div>
      </div>
      </div>
      `,
    });

    console.log("Password reset email sent successfully!");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
