import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  const verificationMail = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Verify Your Email - ChitChat Chat App",
    html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 40px 0;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #6e00ff, #a100ff); padding: 20px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">ChitChat Chat App</h1>
        </div>

        <div style="padding: 30px; text-align: center; color: #333;">
        <h2 style="margin-bottom: 10px;">Welcome to ChitChat Chat App!</h2>
        <p style="font-size: 16px; color: #555;">
        To get started, please verify your email address by clicking the button below.
        </p>

        <a href="${verificationUrl}"
        style="display: inline-block; margin-top: 20px; background: linear-gradient(90deg, #6e00ff, #a100ff); color: white; text-decoration: none;
        padding: 12px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;">
        Verify Email
        </a>

        <p style="margin-top: 25px; font-size: 14px; color: #777;">
        If the button doesn't work, copy and paste this link into your browser:
        </p>

        <p style="word-break: break-all; font-size: 14px; color: #6e00ff;">
        ${verificationUrl}
        </p>
        </div>

        <div style="background-color: #f0f0f5; text-align: center; padding: 15px; font-size: 13px; color: #888;">
        <p>&copy; ${new Date().getFullYear()} ChitChat Chat App. All rights reserved.</p>
        </div>
        </div>
        </div>
        `,
  };

  await transporter.sendMail(verificationMail);
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  const resetMail = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Reset Your Password - ChitChat Chat App",
    html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 40px 0;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #ff0040, #ff6b81); padding: 20px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">ChitChat Chat App</h1>
        </div>

        <div style="padding: 30px; text-align: center; color: #333;">
        <h2 style="margin-bottom: 10px;">Password Reset Request</h2>
        <p style="font-size: 16px; color: #555;">
        We received a request to reset your password. Click the button below to proceed.
        </p>

        <a href="${resetUrl}"
        style="display: inline-block; margin-top: 20px; background: linear-gradient(90deg, #ff0040, #ff6b81); color: white; text-decoration: none;
        padding: 12px 28px; border-radius: 8px; font-size: 16px; font-weight: bold;">
        Reset Password
        </a>

        <p style="margin-top: 25px; font-size: 14px; color: #777;">
        If the button doesn't work, copy and paste this link into your browser:
        </p>

        <p style="word-break: break-all; font-size: 14px; color: #ff0040;">
        ${resetUrl}
        </p>

        <p style="margin-top: 20px; font-size: 13px; color: #888;">
        This link will expire in <strong>1 hour</strong> for your security.
        </p>
        </div>

        <div style="background-color: #f0f0f5; text-align: center; padding: 15px; font-size: 13px; color: #888;">
        <p>&copy; ${new Date().getFullYear()} ChitChat Chat App. All rights reserved.</p>
        </div>
        </div>
        </div>
        `,
  };
  await transporter.sendMail(resetMail);
};
