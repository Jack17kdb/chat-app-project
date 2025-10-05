import React, { useState, useEffect } from 'react'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuthStore } from '../store/AuthStore.js'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [status, setStatus] = useState('ready') // ready, loading, success, error
    const [message, setMessage] = useState('')
    const { resetPassword, isResettingPassword } = useAuthStore()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    useEffect(() => {
        if (!token) {
            setStatus('error')
            setMessage('Invalid or missing reset token. Please request a new password reset link.')
        }
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!token) {
            setStatus('error')
            setMessage('Invalid reset token')
            return
        }

        setStatus('loading')
        const success = await resetPassword(token, newPassword)

        if (success) {
            setStatus('success')
            setMessage('Password reset successfully! Redirecting to login...')
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } else {
            setStatus('error')
        }
    }

    if (status === 'error' && !token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
            <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700 text-center">

            {/* Error Icon */}
            <div className="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4 text-red-400">
            Invalid Link
            </h3>

            {/* Message */}
            <p className="text-gray-300 mb-6">
            {message}
            </p>

            {/* Button */}
            <a
            href="/forgot-password"
            className="inline-block w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold cursor-pointer active:scale-98 hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] transition duration-300"
            >
            Request New Reset Link
            </a>

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

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
            <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700 text-center">

            {/* Success Icon */}
            <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4 text-green-400">
            Password Reset!
            </h3>

            {/* Message */}
            <p className="text-gray-300 mb-6">
            {message}
            </p>

            {/* Loading for redirect */}
            <div className="w-8 h-8 mx-auto border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
        <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">

        {/* Title */}
        <h3 className="text-2xl font-bold text-center mb-4 text-cyan-400">
        Reset Password
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-300 text-center mb-6">
        Enter your new password below.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label htmlFor="newPassword" className="block mb-1 text-sm text-gray-300">
        New Password
        </label>
        <div className="relative">
        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
        type={showPassword ? "text" : "password"}
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter your new password"
        required
        minLength="6"
        className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
        />
        <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
        >
        {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
        </div>
        </div>

        {/* Button */}
        <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold transition duration-300 ${
            status === 'loading'
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer active:scale-98 hover:shadow-[0_0_15px_rgba(34,211,238,0.7)]'
        }`}
        >
        {status === 'loading' ? (
            <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Resetting...
            </div>
        ) : (
            'Reset Password'
        )}
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

export default ResetPassword
