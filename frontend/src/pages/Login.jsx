import React from 'react'

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
            <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">
                <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">
                    Login
                </h2>

                <form className="space-y-4">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Links */}
                <div className="flex justify-between mt-6 text-sm text-gray-400">
                    <a href="/forgot-password" className="hover:text-cyan-400 transition">
                        Forgot Password?
                    </a>
                    <a href="/register" className="hover:text-purple-400 transition">
                        Register
                    </a>
                </div>

                {/* Footer */}
                <footer className="mt-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} MyChatApp (Justin). All rights reserved.
                </footer>
            </div>
        </div>
    )
}

export default Login