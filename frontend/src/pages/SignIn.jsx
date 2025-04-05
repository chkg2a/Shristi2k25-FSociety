import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signing in...");
    try {
      const res = await login(email, password);
      if (res.data?.success) {
        toast.success("Signed in successfully!", { id: loadingToast });
        navigate("/document-matching");
      } else if (res.response?.data?.message) {
        toast.error(res.response.data.message, { id: loadingToast });
      } else {
        toast.error("Login failed. Please try again.", { id: loadingToast });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred during login", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200">
      <Toaster position="top-right" />

      <div className="w-full max-w-md p-1 rounded-2xl shadow-xl">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl w-full transition-all"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Sign In to your Account
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md transform hover:-translate-y-0.5"
          >
            Sign In
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/sign-up"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
