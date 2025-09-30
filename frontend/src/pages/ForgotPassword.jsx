import React from 'react'
import { FiMail } from 'react-icons/fi'

const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
            <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">

                {/* Title */}
                <h3 className="text-2xl font-bold text-center mb-4 text-cyan-400">
                    Forgot Password
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gray-300 text-center mb-6">
                    Enter your email address below and we’ll send you a link to reset your password.
                </p>

                {/* Form */}
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
                            Email
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="cursor-pointer active:scale-98 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] transition duration-300"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* Back link */}
                <div className="text-center mt-6">
                    <a
                        href="/login"
                        className="text-sm text-gray-400 hover:text-cyan-400 transition"
                    >
                        ← Back to Login
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

export default ForgotPassword
