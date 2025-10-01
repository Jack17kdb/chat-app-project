import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningIn: false,
    isLogginIn: false,
    isUpdatingProfile: false,

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
            toast.success("User registered successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSigningIn: false});
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
            toast.error("")
        } finally {
            set({isUpdatingProfile: false});
        }
    }
}))
