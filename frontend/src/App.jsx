import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuthStore } from "./store/AuthStore.js"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Status from "./pages/Status.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
    const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log({ authUser });

    if (isCheckingAuth && !authUser) return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
    )


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/status" element={<Status />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </div>
    );
}

export default App;