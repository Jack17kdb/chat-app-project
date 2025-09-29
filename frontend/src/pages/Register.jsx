import React from 'react'

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
            <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
                    Create Account
                </h1>

                {/* Form */}
                <form className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <fieldset className="border border-gray-700 rounded-lg p-4">
                        <legend className="text-sm text-gray-400 px-2">Role</legend>
                        <label className="block text-sm">
                            <input type="radio" name="role" value="user" defaultChecked className="mr-2" />
                            User
                        </label>
                        <label className="block text-sm mt-2">
                            <input type="radio" name="role" value="admin" className="mr-2" />
                            Admin
                        </label>
                    </fieldset>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] transition duration-300"
                    >
                        Create Account
                    </button>
                </form>

                {/* Already have an account */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="text-cyan-400 hover:underline">
                        Sign in
                    </a>
                </p>

                {/* Footer */}
                <footer className="mt-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} MyChatApp (Justin). All rights reserved.
                </footer>
            </div>
        </div>
    )
}

export default Register