import React, { useState } from "react";
import { FileClock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://notes-backend-e62d.onrender.com/api/auth/forgot-password", {
        email,
      });

      const { resetToken } = res.data;

      setMessage("Redirecting to reset page...");
      // Redirect to reset-password page with token
      navigate(`/reset-password/${resetToken}`);
    } catch (err) {
      setMessage("Error sending reset link. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="flex items-center gap-2 px-5 loginNav absolute z-20 top-0 left-0 bg-white w-full h-[60px]">
        <FileClock className="text-yellow-300 w-10 h-10" />
        <p className="font-bold text-2xl text-gray-600">Notes</p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Enter your email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
