import React, { useState, useEffect } from "react"

const ProfilePage = () => {
    const [name, setName] = useState("User Name")
    const [email, setEmail] = useState("user Email")
    const [avatar, setAvatar] = useState("https://via.placeholder.com/120")
    const [status, setStatus] = useState("offline")
    const [manualOverride, setManualOverride] = useState(null) // null = auto
    const [showSettings, setShowSettings] = useState(false)

    // Load saved user data
    useEffect(() => {
        const savedName = localStorage.getItem("name")
        const savedEmail = localStorage.getItem("email")
        const savedAvatar = localStorage.getItem("avatar")
        const savedOverride = localStorage.getItem("manualOverride")

        if (savedName) setName(savedName)
        if (savedEmail) setEmail(savedEmail)
        if (savedAvatar) setAvatar(savedAvatar)
        if (savedOverride !== null) setManualOverride(savedOverride === "true")
    }, [])

    // Detect status (auto or manual)
    useEffect(() => {
        const updateOnlineStatus = () => {
            if (manualOverride === null) {
                setStatus(navigator.onLine ? "online" : "offline")
            } else {
                setStatus(manualOverride ? "online" : "offline")
            }
        }

        updateOnlineStatus()
        window.addEventListener("online", updateOnlineStatus)
        window.addEventListener("offline", updateOnlineStatus)

        return () => {
            window.removeEventListener("online", updateOnlineStatus)
            window.removeEventListener("offline", updateOnlineStatus)
        }
    }, [manualOverride])

    // Toggle manual control
    const handleToggle = () => {
        const newValue = manualOverride === true ? false : true
        setManualOverride(newValue)
        localStorage.setItem("manualOverride", newValue)
    }

    const handleReset = () => {
        setManualOverride(null)
        localStorage.removeItem("manualOverride")
    }

    // Handle avatar upload
    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatar(reader.result)
                localStorage.setItem("avatar", reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    // Save name + email
    const handleSaveUserInfo = () => {
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        alert("Profile updated ✅")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-6">
            {/* Profile Card */}
            <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">
                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
                    Your Profile
                </h1>

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
                    />
                </div>

                {/* User Info */}
                <div className="space-y-3 text-lg">
                    <p>
                        <strong>Name:</strong>{" "}
                        <span className="text-gray-300">{name}</span>
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        <span className="text-gray-300">{email}</span>
                    </p>
                    <p>
                        <strong>Status:</strong>{" "}
                        {status === "online" ? (
                            <span className="text-green-400 font-semibold">🟢 Online</span>
                        ) : (
                            <span className="text-red-400 font-semibold">🔴 Offline</span>
                        )}
                    </p>
                </div>

                {/* Expandable Settings */}
                <div className="mt-6">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition"
                    >
                        {showSettings ? "Close Settings ⚙" : "Open Settings ⚙"}
                    </button>

                    {showSettings && (
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700 animate-fadeIn">
                            <h2 className="text-lg font-semibold text-cyan-400 mb-3">
                                Settings
                            </h2>

                            {/* Override Status */}
                            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-300">
                  Override Active Status
                </span>
                                <button
                                    onClick={handleToggle}
                                    className="px-3 py-1 text-sm rounded-lg bg-cyan-600 hover:bg-cyan-500 transition"
                                >
                                    {manualOverride === true
                                        ? "Set Offline"
                                        : manualOverride === false
                                            ? "Set Online"
                                            : "Enable Override"}
                                </button>
                            </div>

                            {manualOverride !== null && (
                                <button
                                    onClick={handleReset}
                                    className="w-full text-xs text-gray-400 hover:text-red-400 transition mb-4"
                                >
                                    Reset to Default (Auto-detect)
                                </button>
                            )}

                            {/* Avatar Upload */}
                            <div className="mt-4">
                                <label className="block text-sm text-gray-300 mb-2">
                                    Change Avatar
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="block w-full text-sm text-gray-400 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500"
                                />
                            </div>

                            {/* Edit Name + Email */}
                            <div className="mt-6">
                                <label className="block text-sm text-gray-300 mb-2">
                                    Edit Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 mb-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                                />

                                <label className="block text-sm text-gray-300 mb-2">
                                    Edit Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 mb-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                                />

                                <button
                                    onClick={handleSaveUserInfo}
                                    className="w-full px-4 py-2 mt-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Links */}
                <div className="flex justify-between mt-6">
                    <a
                        href="/status"
                        className="text-sm text-gray-400 hover:text-cyan-400 transition"
                    >
                        Update Status
                    </a>
                    <a
                        href="/"
                        className="text-sm text-gray-400 hover:text-cyan-400 transition"
                    >
                        ← Go back to Chat
                    </a>
                    <a
                        href="/login"
                        className="text-sm text-gray-400 hover:text-red-400 transition"
                    >
                        Logout
                    </a>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-700" />

                {/* Footer */}
                <footer className="text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} MyChatApp (Justin). All rights reserved.
                </footer>
            </div>
        </div>
    )
}

export default ProfilePage