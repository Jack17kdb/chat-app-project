import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningIn: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    isSendingResetEmail: false,
    isResettingPassword: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error checking auth: ", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningIn: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            toast.success("Registration successful! Please check your email for verification.");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSigningIn: false});
        }
    },

    verifyEmail: async (token) => {
        try {
            await axiosInstance.get("/auth/verify-email", {params: {token}});
            toast.success("Email verified successfully!");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
            return false;
        }
    },

    login: async (data) => {
        set({isLogginIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            toast.success("Successfully logged in");
            } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLogginIn: false});
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    profileUpdate: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/profile-update", data);
            set({authUser: res.data});
            toast.success("Profile picture uploaded successfully");
        } catch(error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUpdatingProfile: false});
        }
    },

    forgotPassword: async (email) => {
        set({isSendingResetEmail: true});
        try {
            await axiosInstance.post("/auth/forgot-password", {email});
            toast.success("Password reset email sent! Check your inbox.");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSendingResetEmail: false});
        }
    },

    resetPassword: async (token, newPassword) => {
        set({isResettingPassword: true});
        try {
            await axiosInstance.post("/auth/reset-password", { token, newPassword });
            toast.success("Password reset successfully! You can now login with your new password.");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
            return false;
        } finally {
            set({isResettingPassword: false});
        }
    },
}))
