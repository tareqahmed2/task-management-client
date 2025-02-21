import React, { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../animation/login.json";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login logic here
    console.log("Logging in with", email, password);
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
        <form
          onSubmit={handleSubmit}
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
            type="submit"
            className="py-2 btn btn-secondary text-white rounded-md w-full"
          >
            <span>
              <FaGoogle></FaGoogle>
            </span>
            Login With Google
          </button>

          <button
            type="submit"
            className="py-2 bg-blue-500 text-white rounded-md w-full"
          >
            Login
          </button>
          <span className="text-center">
            Didn't have an account?{" "}
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
