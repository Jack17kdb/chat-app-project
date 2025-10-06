import React from "react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
        {/* Title */}
        <h3 className="text-2xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Forgot Password
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-300 text-center mb-8">
          Enter your email address below and we’ll send you a link to reset your
          password.
        </p>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:scale-[1.02] active:scale-[0.98] transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back link */}
        <div className="text-center mt-8">
          <a
            href="/login"
            className="text-sm text-gray-400 hover:text-cyan-400 transition"
          >
            ← Back to Login
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            MyChatApp
          </span>
          . All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ForgotPassword;
