import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Status from "./pages/Status.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

import React, { useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
    // 🔹 This runs once to check Firebase connection
    useEffect(() => {
        const test = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "messages"));
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            } catch (error) {
                console.error("Firebase connection error:", error);
            }
        };
        test();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/status" element={<Status />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;