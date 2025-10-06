import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/AuthStore.js";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const { verifyEmail } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus("error");
        setMessage(
          "Invalid verification link. Please request a new verification email."
        );
        return;
      }

      const success = await verifyEmail(token);
      if (success) {
        setStatus("success");
        setMessage(
          "Email verified successfully! You can now login to your account."
        );
      } else {
        setStatus("error");
        setMessage(
          "Verification failed. The link may have expired or is invalid."
        );
      }
    };

    verifyToken();
  }, [token, verifyEmail]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleResendEmail = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700 text-center">
        {/* Icon */}
        <div className="mb-6">
          {status === "verifying" && (
            <div className="w-16 h-16 mx-auto border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          )}
          {status === "success" && (
            <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          )}
          {status === "error" && (
            <div className="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-4">
          {status === "verifying" && "Verifying Email..."}
          {status === "success" && "Email Verified!"}
          {status === "error" && "Verification Failed"}
        </h3>

        {/* Message */}
        <p className="text-gray-300 mb-6">{message}</p>

        {/* Buttons */}
        <div className="space-y-3">
          {status === "success" && (
            <button
              onClick={handleLoginRedirect}
              className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold cursor-pointer active:scale-98 hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] transition duration-300"
            >
              Go to Login
            </button>
          )}

          {status === "error" && (
            <button
              onClick={handleResendEmail}
              className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold cursor-pointer active:scale-98 hover:shadow-[0_0_15px_rgba(34,211,238,0.7)] transition duration-300"
            >
              Sign Up Again
            </button>
          )}
        </div>

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
  );
};

export default VerifyEmail;
