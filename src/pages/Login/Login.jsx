import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../animation/login.json";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user, loginWithGoogle, loginWithEmail } = useAuth();

  // Redirect to Home if user is logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handle email and password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await loginWithEmail(email, password);
      navigate("/dashboard"); // Redirect after successful registration
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDemoLogin = async (e) => {
    const demoEmail = "tareq12@admin.com";
    const demoPass = "Tareq123";
    try {
      await loginWithEmail(demoEmail, demoPass);
      navigate("/dashboard"); // Redirect after successful registration
    } catch (err) {
      setError(err.message);
    }
  };
  // Handle Google login
  const handleGoogleLogin = async () => {
    setError(""); // Clear previous errors
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-10 bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl md:text-4xl font-bold my-4 text-pink-400">
          Login Now
        </h2>
        <div className="w-48 h-48 md:w-64 md:h-64 mb-8">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form
          onSubmit={handleEmailLogin}
          className="flex flex-col space-y-4 w-full"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="py-2 bg-gray-800 text-white rounded-md w-full flex items-center justify-center gap-2"
          >
            <FaGoogle />
            Login With Google
          </button>
          <button
            type="submit"
            className="py-2 bg-blue-500 text-white rounded-md w-full"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="py-2 bg-pink-500 text-white rounded-md w-full"
          >
            Demo Login
          </button>
          <span className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="underline text-red-500">
              Register here...
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
