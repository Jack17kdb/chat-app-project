import React, { useState, useEffect } from 'react'

const Status = () => {
    const [avatar, setAvatar] = useState("https://via.placeholder.com/120")
    const [name, setName] = useState("User Name")
    const [email, setEmail] = useState("user@email.com")
    const [isEditing, setIsEditing] = useState(false)

    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedAvatar = localStorage.getItem("avatar")
        const savedName = localStorage.getItem("name")
        const savedEmail = localStorage.getItem("email")

        if (savedAvatar) setAvatar(savedAvatar)
        if (savedName) setName(savedName)
        if (savedEmail) setEmail(savedEmail)
    }, [])

    // Handle avatar change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setAvatar(reader.result)
                localStorage.setItem("avatar", reader.result) // Save persistently
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle save
    const handleSave = (e) => {
        e.preventDefault()
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        setIsEditing(false)
        alert("Profile updated successfully ✅")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-6">
            <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">

                {/* Title */}
                <h1 className="text-2xl font-bold text-center text-cyan-400 mb-6">Profile Status</h1>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
                    />
                    <label className="mt-3 text-sm text-gray-300 cursor-pointer hover:text-cyan-400">
                        Change Avatar
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Profile Info */}
                {!isEditing ? (
                    <div className="space-y-3">
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Status:</strong> 🟢 Online</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full mt-4 py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] transition duration-300"
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                            />
                        </div>

                        {/* Save button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] transition duration-300"
                        >
                            Save Changes
                        </button>
                    </form>
                )}

                {/* Links */}
                <div className="flex justify-between mt-6 text-sm">
                    <a href="/" className="hover:text-cyan-400">Go to Chat</a>
                    <a href="/profile" className="hover:text-cyan-400">Profile</a>
                    <a href="/status" className="hover:text-cyan-400">Update Status</a>
                    <a href="/login" className="hover:text-red-400">Logout</a>
                </div>

                {/* Footer */}
                <footer className="mt-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} MyChatApp (Justin). All rights reserved.
                </footer>
            </div>
        </div>
    )
}

export default Status