import React from 'react'

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
            <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">

                {/* Title */}
                <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
                    Create Account
                </h1>

                {/* Form */}
                <form className="space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:scale-[1.02] active:scale-[0.98] transition duration-300"
                    >
                        Create Account
                    </button>
                </form>

                {/* Already have an account */}
                <p className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="text-cyan-400 font-medium hover:underline">
                        Sign in
                    </a>
                </p>

                {/* Footer */}
                <footer className="mt-8 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">MyChatApp (Justin)</span>. All rights reserved.
                </footer>
            </div>
        </div>
    )
}

export default Register
